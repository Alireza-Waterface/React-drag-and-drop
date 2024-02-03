import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './dropFileInput.css';

import { ImageConfig } from '../config/ImageConfig';
import uploadImg from '../assets/upload.png';

const DropFileInput = props => {
    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    };

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="Upload file icon" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input
                    type="file"
                    required
                    onChange={onFileDrop}
                />
            </div>
            {
                fileList.length > 0 && (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img // code below just gets the last item from the splitted array
                                        src={ImageConfig[item.name.split('.')[item.name.split('.').length - 1]] || ImageConfig['default']}
                                        alt={item.name.split('.')[item.name.split('.').length - 1]}
                                    />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>
                                            { item.size < 1024 ? `${item.size} B`
                                                :
                                                (item.size >= 1024 && item.size <= 1024000) ? `${(item.size / 1024).toFixed(2)} KB`
                                                :
                                                (item.size >= 1024000 && item.size < 1024000000) ? `${(item.size / 1024000).toFixed(2)} MB`
                                                :
                                                (item.size >= 1024000000 && item.size < 1024000000000) ? `${(item.size / 1024000000).toFixed(2)} GB`
                                                :
                                                '1TB or larger' // You can go further but no need to do that
                                            }
                                        </p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>X</span>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
};

export default DropFileInput;