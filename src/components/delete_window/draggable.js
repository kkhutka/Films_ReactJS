let draggableModalZIndex = 1;
let isResizing = false;

const draggable = elem => {
    const draggableModalWindow = document.createElement('div');
    draggableModalWindow.appendChild(elem);
    draggableModalWindow.className = 'draggable';
    draggableModalWindow.style.backgroundColor = `green`;
    draggableModalWindow.style.zIndex = `${draggableModalZIndex++}`;
    isResizing = false;



    document.body.appendChild(draggableModalWindow);

    const windowWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    const windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

    let modalWindowWidth = draggableModalWindow.offsetWidth;
    let modalWindowHeight = draggableModalWindow.offsetHeight;


    const modalWindowLeft = Math.max((windowWidth - modalWindowWidth) / 2, 0);
    const modalWindowTop = Math.max((windowHeight - modalWindowHeight) / 2, 0);

    draggableModalWindow.style.left = `${modalWindowLeft}px`;
    draggableModalWindow.style.top = `${modalWindowTop}px`;

    draggableModalWindow.onmousedown = e => {
        if (!isResizing) {
            draggableModalWindow.style.zIndex = draggableModalZIndex++;

            const {left, top} = draggableModalWindow.getBoundingClientRect();

            const shiftX = e.pageX - left;
            const shiftY = e.pageY - top;

            document.onmousemove = e => {
                draggableModalWindow.style.left = `${e.pageX - shiftX}px`;
                draggableModalWindow.style.top = `${e.pageY - shiftY}px`;


            }
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            }

        }

    };
    const res_names = ['top-left','top-right','bottom-left','bottom-right'];
    createResizableHandle(res_names,draggableModalWindow);

}


function createResizableHandle(res_name, draggableModalWindow) {
    let mouseX, mouseY;
    let original_width,original_height;
    let resizerArray = [];
    let {left, top} = draggableModalWindow.getBoundingClientRect();
    res_name.forEach ((name) => {
        const resizer = document.createElement('div');
        resizer.className = `resizable_${name}`;
        draggableModalWindow.appendChild(resizer);
        resizerArray.push(resizer);
    });

    for (let i = 0;i < resizerArray.length; i++) {
        const activeResizer = resizerArray[i];
        activeResizer.addEventListener('mousedown', function (e) {
            e.preventDefault()
            isResizing = true;
            mouseX = e.pageX;
            mouseY = e.pageY;
            left = draggableModalWindow.getBoundingClientRect().left;
            top = draggableModalWindow.getBoundingClientRect().top;
            original_width = draggableModalWindow.getBoundingClientRect().width;
            original_height = draggableModalWindow.getBoundingClientRect().height;
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        })


        function resize(e) {
            if (!isResizing) return;
            console.log(activeResizer.className)
            if (activeResizer.className==='resizable_top-left') {
                draggableModalWindow.style.height = original_height + (mouseY - e.pageY) + 'px';
                draggableModalWindow.style.width = original_width + (mouseX - e.pageX) + 'px';
                draggableModalWindow.style.left = `${left-(mouseX - e.pageX)}px`;
                draggableModalWindow.style.top = `${top+(e.pageY-mouseY)}px`;
            } else if (activeResizer.className==='resizable_top-right') {
                draggableModalWindow.style.height = original_height - (e.pageY - mouseY) + 'px';
                draggableModalWindow.style.width = original_width + (e.pageX - mouseX) + 'px';
                draggableModalWindow.style.top = `${top+(e.pageY-mouseY)}px`;
                //console.log(draggableModalWindow.style.top, draggableModalWindow.style.left);
            } else if (activeResizer.className==='resizable_bottom-right') {
                draggableModalWindow.style.height = original_height + (e.pageY - mouseY) + 'px';
                draggableModalWindow.style.width = original_width + (e.pageX - mouseX) + 'px';


            } else {
                draggableModalWindow.style.height = original_height + (e.pageY - mouseY) + 'px';
                draggableModalWindow.style.width = original_width - (e.pageX - mouseX) + 'px';
                draggableModalWindow.style.left = `${left-(mouseX - e.pageX)}px`;

            }

        }

        function stopResize(e) {
            window.removeEventListener('mousemove', resize);
            isResizing = false;

        }

    }

}




const showDraggableModal = () => {
    const contentElem = document.createElement('div');
    draggable(contentElem);
}


export default showDraggableModal;


