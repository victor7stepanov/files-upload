import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from './upload'

const firebaseConfig = {
    apiKey: "AIzaSyAHFLs-D1p_GQdEu51JxX583iC4dOG1tzg",
    authDomain: "files-upload-701a9.firebaseapp.com",
    projectId: "files-upload-701a9",
    storageBucket: "files-upload-701a9.appspot.com",
    messagingSenderId: "630272030231",
    appId: "1:630272030231:web:ff6ec4d5eb70a48d3b4e52"
}

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage
            }, error => {
                console.log(error)
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log('Download URL', url)
                })
            })
        })
    }
})

// переписать плагин на использование классов. с конструктором, приватными и публичными полями
// подключить фреймворк и написать плагин на нем
// расширять функционал плагина (добавлять картинки, изменять их, выдавать ссылку рабочую на загрузчик, вывести галерею)