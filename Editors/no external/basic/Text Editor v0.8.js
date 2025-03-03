javascript: (function() {
    let editorContainer = document.createElement('div');
    editorContainer.style.position = 'fixed';
    editorContainer.style.bottom = '50px';
    editorContainer.style.right = '50px';
    editorContainer.style.width = '500px';
    editorContainer.style.height = '400px';
    editorContainer.style.zIndex = '9999';
    editorContainer.style.border = '1px solid black';
    editorContainer.style.boxShadow = '-3px 3px 8px rgba(0, 0, 0, 0.5)';
    editorContainer.style.backgroundColor = '#333';
    editorContainer.style.borderRadius = '5px';
    editorContainer.style.resize = 'both';
    editorContainer.style.overflow = 'hidden';
    let titleBar = document.createElement('div');
    titleBar.style.backgroundColor = '#444';
    titleBar.style.color = '#fff';
    titleBar.style.padding = '10px';
    titleBar.style.cursor = 'move';
    titleBar.innerText = 'Text Pad';
    titleBar.style.userSelect = 'none';
    let buttonsContainer = document.createElement('div');
    buttonsContainer.style.position = 'absolute';
    buttonsContainer.style.top = '5px';
    buttonsContainer.style.right = '10px';
    let closeButton = document.createElement('button');
    closeButton.innerText = 'X';
    closeButton.style.backgroundColor = '#ff6b6b';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.marginLeft = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = function() {
        if (confirm('Are you sure you want to close the text pad?')) {
            editorContainer.remove();
        }
    };
    let minimizeButton = document.createElement('button');
    minimizeButton.innerText = '-';
    minimizeButton.style.backgroundColor = '#ffcc00';
    minimizeButton.style.color = 'white';
    minimizeButton.style.border = 'none';
    minimizeButton.style.marginLeft = '5px';
    minimizeButton.style.cursor = 'pointer';
    minimizeButton.onclick = function() {
        let isMinimized = editorContainer.style.height === '30px';
        editorContainer.style.height = isMinimized ? '400px' : '30px';
        editorContainer.style.overflow = isMinimized ? 'auto' : 'hidden';
    };
    buttonsContainer.appendChild(minimizeButton);
    buttonsContainer.appendChild(closeButton);
    titleBar.appendChild(buttonsContainer);
    editorContainer.appendChild(titleBar);
    let isDragging = false;
    let offsetX, offsetY;
    titleBar.onmousedown = function(e) {
        isDragging = true;
        offsetX = e.clientX - editorContainer.getBoundingClientRect().left;
        offsetY = e.clientY - editorContainer.getBoundingClientRect().top;
        document.onmousemove = function(e) {
            if (isDragging) {
                editorContainer.style.left = e.clientX - offsetX + 'px';
                editorContainer.style.top = e.clientY - offsetY + 'px';
                editorContainer.style.right = 'auto';
                editorContainer.style.bottom = 'auto';
            }
        };
        document.onmouseup = function() {
            isDragging = false;
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
    let buttonBar = document.createElement('div');
    buttonBar.style.backgroundColor = '#444';
    buttonBar.style.padding = '10px';
    buttonBar.style.display = 'flex';
    buttonBar.style.gap = '10px';
    buttonBar.style.boxSizing = 'border-box';
    let createButton = function(text, onClick) {
        let button = document.createElement('button');
        button.innerText = text;
        button.style.backgroundColor = '#555';
        button.style.color = 'white';
        button.style.border = '1px solid #666';
        button.style.padding = '5px 10px';
        button.style.cursor = 'pointer';
        button.onclick = onClick;
        return button;
    };
    let textArea = document.createElement('textarea');
    textArea.style.width = '100%';
    textArea.style.height = 'calc(100% - 95px)';
    textArea.style.border = 'none';
    textArea.style.padding = '10px';
    textArea.style.fontSize = '14px';
    textArea.style.fontFamily = 'monospace';
    textArea.style.backgroundColor = '#2e2e2e';
    textArea.style.color = 'white';
    textArea.style.boxSizing = 'border-box';
    editorContainer.appendChild(textArea);
    document.body.appendChild(editorContainer);
    let settingsButton = createButton('Settings', function() {
        settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
    });
    buttonBar.appendChild(settingsButton);
    let settingsMenu = document.createElement('div');
    settingsMenu.style.display = 'none';
    settingsMenu.style.position = 'absolute';
    settingsMenu.style.top = '50px';
    settingsMenu.style.right = '10px';
    settingsMenu.style.backgroundColor = '#444';
    settingsMenu.style.padding = '10px';
    settingsMenu.style.borderRadius = '5px';
    settingsMenu.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    settingsMenu.style.zIndex = '10000';
    settingsMenu.style.color = '#fff';
    let themeSelector = createButton('Toggle Theme', function() {
        let currentTheme = document.body.style.backgroundColor === 'rgb(0, 0, 0)' ? 'dark' : 'light';
        if (currentTheme === 'dark') {
            document.body.style.backgroundColor = 'white';
            textArea.style.backgroundColor = '#fff';
            textArea.style.color = '#000';
        } else {
            document.body.style.backgroundColor = 'black';
            textArea.style.backgroundColor = '#2e2e2e';
            textArea.style.color = 'white';
        }
    });
    let fontSizeSelector = createButton('Increase Font Size', function() {
        let currentSize = parseInt(window.getComputedStyle(textArea).fontSize);
        textArea.style.fontSize = % 60 $ {
            currentSize + 2
        }
        px % 60;
    });
    let textWrapToggle = createButton('Toggle Text Wrapping', function() {
        textArea.style.whiteSpace = textArea.style.whiteSpace === 'pre' ? 'pre-wrap' : 'pre';
    });
    settingsMenu.appendChild(themeSelector);
    settingsMenu.appendChild(fontSizeSelector);
    settingsMenu.appendChild(textWrapToggle);
    editorContainer.appendChild(settingsMenu);
    buttonBar.appendChild(createButton('Save', function() {
        let blob = new Blob([textArea.value], {
            type: 'text/plain'
        });
        let a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = % 60 textoverlay_$ {
            new Date().toISOString().replace(/[:.]/g, '-')
        }.txt % 60;
        a.click();
    }));
    let loadInput = document.createElement('input');
    loadInput.type = 'file';
    loadInput.style.display = 'none';
    loadInput.onchange = function(event) {
        let file = event.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                textArea.value = e.target.result;
            };
            reader.readAsText(file);
        }
    };
    buttonBar.appendChild(createButton('Load', function() {
        loadInput.click();
    }));
    buttonBar.appendChild(createButton('Run', function() {
        try {
            eval(textArea.value);
        } catch (error) {
            console.error(error);
        }
    }));
    buttonBar.appendChild(createButton('Undo', function() {
        document.execCommand('undo');
    }));
    buttonBar.appendChild(createButton('Redo', function() {
        document.execCommand('redo');
    }));
    editorContainer.appendChild(buttonBar);
})();
