export default function cleaner(context,canvas){
    
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'black';

    context.fillRect(0, 0, canvas.width, canvas.height);
}