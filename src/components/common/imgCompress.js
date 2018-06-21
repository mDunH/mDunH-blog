import React from "react";
import EXIF from "exif-js";

function ImgCompress(props) {
    function dataURItoBlob(dataURI) {
        // 转为Blob对象

        //去掉url的头，并转换为byte
        const bytes = atob(dataURI.split(',')[1]),
            mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0],
            //处理异常,将ascii码小于0的转换为大于0
            ab = new ArrayBuffer(bytes.length),
            ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });

    }
    function getPhotoOrientation(img) {
        let orient;
        EXIF.getData(img, function () {
           orient = EXIF.getTag(this, "Orientation");
        });
        return orient;
    }
    function change(e) {
        ;(async (e) => {
            const files = e.target.files;
            console.log(files);
            const newImgList = [];
            const newFileList = [];
            await new Promise((response, reject) => {
                if (files.length === 0)
                    response();
                Array.prototype.forEach.call(files, (file) => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (e) => {
                        console.log(e);
                        const img = new Image();
                        const url = reader.result;
                        img.src = url;
                        img.onload = () => {
                            const orient = getPhotoOrientation(img);
                            console.log(orient);

                            const imgW = img.width;
                            const imgH = img.height;
                            let cW, cH;
                            const proportion = props.proportion instanceof Array ? props.proportion[0] / props.proportion[1] : 1;
                            if (imgW / imgH > proportion) {
                                cW = imgH * proportion;
                                cH = imgH;
                            } else {
                                cW = imgW;
                                cH = imgW / proportion;
                            }
                            canvas.width = cW;
                            canvas.height = cH;
                            if (orient !== 6)
                                ctx.drawImage(img, (cW - imgW) / 2, (cH - imgH) / 2, imgW, imgH);
                            else {
                                ctx.rotate(Math.PI / 2);
                                ctx.drawImage(img, (cH - imgW) / 2, (cW - imgH) / 2 - cW, imgW, imgH);
                            }

                            let newUrl = canvas.toDataURL(`image/${props.extension || "jpeg"}`, 1);
                            let blob = dataURItoBlob(newUrl);
                            console.log(blob)
                            const compressionRatio =  props.maxSize / blob;
                            if (compressionRatio && compressionRatio < 1) {
                                newUrl = canvas.toDataURL(`image/${props.extension || "jpeg"}`, (9 + compressionRatio) / 10);
                                blob = dataURItoBlob(newUrl);
                                console.log(blob)
                            }
                            const newImg = new Image();
                            newImg.src = newUrl;
                            newImgList.push(newUrl);
                            newFileList.push(blob);
                            response();
                        }
                        img.onerror = (err) => {
                            console.log(err);
                            alert("图片加载失败！");
                            reject();
                        }
                    }
                    reader.onerror = (err) => {
                        console.log(err);
                        alert("图片读取失败！");
                        reject();
                    }
                })
            });
            console.log(newImgList);
            console.log(newFileList);

            if (props.getImgs)
                props.getImgs(newImgList);
            if (props.getFiles)
                props.getFiles(newFileList);
        })(e).catch((err) => {
            console.log(err);
            alert(err);
        });
    }
    return <input className={props.className} onChange={change} type="file" accept="image/*" disabled={props.disabled} />
}
export default ImgCompress;