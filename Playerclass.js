
function validateImage(image) {
    return image && image.complete && image.naturalWidth > 0;
}

export default class Player {

    currentFrame = 0;

    gameframe = 0;

    frameCount = 6;

    staggerFrames = 15;

    jumped = false;

    animationComplete = false;

    isattacking = false;

    resetExecuted = false;

    shots = [];

    shotX = 0;

    shotY = 0;

    isDead = false;

    actionExecuted = {
        right: false,
        left: false,
        jump: false,
        attack: false,
        ranged: false,
    };

    constructor(x, y, width, height, state, canvas, right, left, attack, jump, ranged, sprites, frameWidth, frameHeight, reverse = false, shot, shotWidth, shotHeight, shotFrameCount, shotRevers, attackSound, attackTwoSound, throwSound) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.state = state;
        this.canvas = canvas;
        this.right = right;
        this.left = left;
        this.attack = attack;
        this.jump = jump;
        this.ranged = ranged;
        this.lastKey;
        this.sprites = sprites;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.attackTimeout = null;
        this.shot = shot;
        this.shotWidth = shotWidth;
        this.shotHeight = shotHeight;
        this.shotFrameCount = shotFrameCount;
        this.shotRevers = shotRevers;
        this.playerImage = new Image();
        this.playerImage.src = this.sprites[0];
        this.attackSound = new Audio(attackSound);
        this.attackTwoSound = new Audio(attackTwoSound);
        this.throwSound = new Audio(throwSound);



        this.keys = {
            right: false,
            left: false,
            jump: false,
            attack: false,
            cast: false,
        };
    }


    draw(context, canvas) {
    
        if (!validateImage(this.playerImage)) {
            return; // Skip rendering if the image is invalid
        }
        const frameWidth = this.frameWidth;
        const frameHeight = this.frameHeight;

        // Check if the player is dead
        if (this.isDead) {
            if (!this.deathAnimationPlayed) {
                if (this.gameframe % this.staggerFrames === 0) {
                    if (this.currentFrame < this.frameCount - 1) {
                        this.currentFrame++; // Increment frame for death animation
                    } else {
                        this.currentFrame = this.frameCount - 1; // Freeze on last frame
                        this.deathAnimationPlayed = true; // Mark the animation as played
                    }
                }
                this.gameframe++;
            }

            // Draw the last frame of the death animation
            const frameX = this.currentFrame * frameWidth;
            context.drawImage(
                this.playerImage,
                frameX,
                0,
                frameWidth,
                frameHeight,
                this.x,
                this.y - this.height,
                this.width,
                this.height
            );
            return;
        }

        // Regular animation logic
        if (this.gameframe % this.staggerFrames === 0) {
            if (this.reverse) {
                if (this.currentFrame > 0) {
                    this.currentFrame--; // Decrement frame
                } else {
                    this.currentFrame = this.frameCount - 1; // Reset to last frame
                    this.isattacking = false; // Reset attack state
                }
            } else {
                if (this.currentFrame < this.frameCount - 1) {
                    this.currentFrame++; // Increment frame
                } else {
                    this.currentFrame = 0; // Reset to first frame
                    this.isattacking = false; // Reset attack state
                }
            }
        }
        this.gameframe++;

        const frameX = this.reverse
            ? (this.frameCount - 1 - this.currentFrame) * frameWidth // Right-to-left
            : this.currentFrame * frameWidth; // Left-to-right

        // Draw the player sprite
        context.drawImage(
            this.playerImage,
            frameX,
            0,
            frameWidth,
            frameHeight,
            this.x,
            this.y - this.height,
            this.width,
            this.height
        );

        const centerX = this.x + this.width / 2; // Center X of the player
        const centerY = this.y - this.height / 2; // Center Y of the player
        const radius = Math.min(this.width, this.height) / 6; // Radius for tight fit

        // context.beginPath();
        // context.arc(centerX, centerY, radius, 0, Math.PI * 2);
        // context.strokeStyle = "red";
        // context.lineWidth = 2;
        // context.stroke();

        // Draw and animate shots
    }

    handleInput(event, isKeyDown) {
        switch (event.key) {

            case this.right:

                this.keys.right = isKeyDown;
                if (isKeyDown) {
                    this.keys.left = false;

                    this.resetExecuted = false;

                    if (!this.actionExecuted.right) {

                        this.applySetting(this.sprites[1]);

                        this.actionExecuted.right = true;

                    }
                } else {

                    this.actionExecuted.right = false;

                }
                break;

            case this.left:

                this.keys.left = isKeyDown;

                if (isKeyDown) {

                    this.keys.right = false;

                    this.resetExecuted = false;

                    if (!this.actionExecuted.left) {

                        this.applySetting(this.sprites[1]);

                        this.actionExecuted.left = true;
                    }
                } else {

                    this.actionExecuted.left = false;

                }
                break;

            case this.jump:
                if (this.y >= this.canvas.height - 30) {

                    this.keys.jump = isKeyDown;

                    this.resetExecuted = false;

                    if (!this.actionExecuted.jump) {

                        this.applySetting(this.sprites[3]);

                        this.actionExecuted.jump = true;
                    }
                } else {

                    this.actionExecuted.jump = false;

                }
                break;

            case this.attack:

                this.keys.attack = isKeyDown;

                this.resetExecuted = false;

                if (isKeyDown) {

                    if (!this.actionExecuted.attack) {

                        this.state = "attacking"

                        this.attacking();

                        this.actionExecuted.attack = true;

                    }
                } else {

                    this.actionExecuted.attack = false;

                }
                break;

            case this.ranged:

                this.keys.ranged = isKeyDown;

                if (isKeyDown) {

                    if (!this.actionExecuted.ranged) {

                        this.rangedAttack();

                        this.actionExecuted.ranged = true;

                    }
                } else {

                    this.actionExecuted.ranged = false;

                }
                break;
        }
    }

    applySetting(sprite) {
        this.playerImage.src = sprite.src;

        this.frameCount = sprite.frameCount;

        this.staggerFrames = sprite.staggerFrames;

        this.currentFrame = 0;
    }

    moveForward() {
        let hitLimit = this.x + this.width >= this.canvas.width + 20;
        if (!hitLimit) {
            this.x += 3;
        }
    }

    moveBackward() {
        let hitLimit = this.x <= -30;

        if (!hitLimit) {

            this.x -= 3;
        }
    }

    jumping() {
        let onMidAir = this.y <= this.canvas.height / 2;

        if (!onMidAir && this.jumped == false) {
            this.y -= 7;
        }
        if (onMidAir) {
            this.jumped = true;
        }
    }

    attacking() {

        this.isattacking = true;

        this.state = "attacking";

        if (!this.attackTimeout) {

            this.currentAttackPhase = 0;
        }

        if (this.currentAttackPhase === 0) {

            this.applySetting(this.sprites[2]);

            this.currentAttackPhase = 1;
            this.playSound(this.attackSound)



        } else {
            this.applySetting(this.sprites[5]);
            this.playSound(this.attackTwoSound)

            this.currentAttackPhase = 0;
        }

        clearTimeout(this.attackTimeout);

        this.attackTimeout = setTimeout(() => {

            this.isattacking = false;

            this.state = "idle";

            this.currentAttackPhase = 0;

        }, 500);

        this.keys.attack = false;

    }

    playSound(sound) {
        sound.currentTime = 0;
        sound.play();

    }

    rangedAttack() {

        if (this.isattacking) {

            return;
        }

        this.isattacking = true;

        this.state = "attacking";
        this.shots.push({ x: this.x, y: this.y })

        this.applySetting(this.sprites[6]);
        this.playSound(this.throwSound)
        this.keys.ranged = false;
    }
    drawShots(context) {

        let shot = new Image();

        shot.src = this.shot;
        
        if (!validateImage(shot)) {
            return; // Skip rendering if the image is invalid
        }


        let frameX = 0;

        this.shotAnimationFrame = this.shotAnimationFrame || 0;

        this.shotGameFrame = this.shotGameFrame || 0;


        const shotStaggerFrames = 10;



        if (this.shotGameFrame % shotStaggerFrames === 0) {

            this.shotAnimationFrame++;

            if (this.shotAnimationFrame >= this.shotFrameCount) {

                this.shotAnimationFrame = 0;
            }
        }

        frameX = this.shotWidth * this.shotAnimationFrame;

  

        this.shots.forEach((attack) => {

            context.drawImage(
                shot,
                frameX,
                0,
                this.shotWidth,
                this.shotHeight,
                attack.x,
                attack.y - this.height / 2,
                this.shotWidth * 3,
                this.shotHeight * 3
            );

            const centerX = attack.x + this.shotWidth;

            const centerY = attack.y - (this.height / 2) / 1.3;

            const radius = Math.min(this.shotWidth, this.shotHeight)

            // context.beginPath();

            // context.arc(centerX, centerY, radius, 0, Math.PI * 2); 

            // context.strokeStyle = "red"; 

            // context.lineWidth = 2;

            // context.stroke();
        });

        this.shotGameFrame++;



    }

    updateShot() {
        this.shots = this.shots.filter((attack) => {
            if (this.shotRevers) {

                attack.x -= 7;

            } else {

                attack.x += 7;

            }
            return attack.x <= this.canvas.width && attack.x >= -10;

        });

    }

    gravity() {
        let onTheground = this.y >= this.canvas.height - 30;

        if (this.jumped && !onTheground) {

            this.y += 3.5;
        }

        if (onTheground && this.jumped) {

            this.jumped = false;

            this.keys.jump = false;


            if (!this.keys.right && !this.keys.left) {

                this.applySetting(this.sprites[0]);


            } else if (this.keys.right) {

                this.applySetting(this.sprites[1]);

            } else if (this.keys.left) {

                this.state = "moveLeft";

                this.applySetting(this.sprites[1]);

            }

        }
    }


    reset() {
        let nopressedKey = Object.values(this.keys).every(key => key === false);

        let isNotAttacking = !this.isattacking;

        if (nopressedKey && isNotAttacking && !this.resetExecuted) {

            this.applySetting(this.sprites[0]);

            this.resetExecuted = true;

            this.state = "idle"

        }
    }
    resetAttack() {
        if (this.isattacking) {

            if (this.currentFrame >= this.sprites[2].frameCount - 1) {

                if (this.keys.right || this.keys.left) {

                    this.applySetting(this.sprites[1]);

                } else {
                    this.applySetting(this.sprites[0]);

                }
                this.isattacking = false;
            }
        }

        if (this.state === "jumping" && this.isattacking && this.currentFrame >= 4) {

            this.applySetting(this.sprites[0]);

            this.isattacking = false;
        }
    }

    update() {

        this.reset();

        this.gravity();

        this.resetAttack();

        this.updateShot();

        if (this.keys.right) {

            this.state = "moveRight";

            this.lastKey = "right";

            this.moveForward();

        } else if (this.keys.left) {

            this.state = "moveleft";

            this.lastKey = "left";

            this.moveBackward();
        }

        if (this.keys.jump) {

            this.state = "jumping";

            this.jumping();
        }

        if (this.state === "attacking" && this.currentFrame >= this.sprites[5].frameCount - 1) {

            this.state = "idle";

            this.applySetting(this.sprites[0]);
        }


    }

}
