const url = 'https://www.canva.com/design/DAGLZM7jlks/iD28spBtJFeo_eGMh3OF-g/edit?utm_content=DAGLZM7jlks&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'; // URL file PDF di GitHub

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
