const url = 'https://www.canva.com/design/DAGLlOxve1I/7d0DFSdnq5JjFzh7R3TMwg/view'; // URL file PDF di GitHub

pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs/pdf.worker.min.js';

const flipbook = document.getElementById('flipbook');

const loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(pdf => {
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pdf.getPage(pageNum).then(page => {
            const scale = 1.5;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext).promise.then(() => {
                const div = document.createElement('div');
                div.classList.add('page');
                div.appendChild(canvas);
                flipbook.appendChild(div);

                if (pageNum === pdf.numPages) {
                    $(flipbook).turn({
                        width: '100%',
                        height: '100%'
                    });
                }
            });
        });
    }
});
