import React, { useContext, useState } from "react";
import './../../style.css';
import Sidebar from "../../Components/Sidebar";
import './style.css';

import { AuthContext } from "../../Contexts/auth";

import { db, storage } from '../../Services/firebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { toast } from "react-toastify";


export default function Profile(){
    const { user, storageUser, setUser, logout } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null);
  
    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)
    const [password, setPassword] = useState(user && user.password)
  
    function handleFile(e){
      if(e.target.files[0]){
        const image = e.target.files[0];
  
        if(image.type === 'image/jpeg' || image.type === 'image/png'){
          setImageAvatar(image)
          setAvatarUrl(URL.createObjectURL(image))
        }else{
          alert("Envie uma imagem do tipo PNG ou JPEG")
          setImageAvatar(null);
          return;
        }
  
  
      }
    }
  
   
    async function handleUpload(){
      const currentUid = user.uid;
  
      const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)
  
      const uploadTask = uploadBytes(uploadRef, imageAvatar)
      .then((snapshot) =>{
        
        getDownloadURL(snapshot.ref).then( async (downloadURL) => {
          let urlFoto = downloadURL;
  
          const docRef = doc(db, "users", user.uid)
          await updateDoc(docRef, {
            avatarUrl: urlFoto,
            nome: nome,
          })
          .then(() => {
            let data = {
              ...user,
              nome: nome,
              avatarUrl: urlFoto,
            }
     
            setUser(data);
            storageUser(data);
            toast.success("Atualizado com sucesso!")
            
          })
  
        })
  
      })
  
    }
   
   
   
    async function handleSubmit(e){
      e.preventDefault();
  
     if(imageAvatar === null && nome !== ''){
       // Atualizar apenas o nome do user
       const docRef = doc(db, "users", user.uid) 
       await updateDoc(docRef, {
         nome: nome,
       })
       .then(() => {
         let data = {
           ...user,
           nome: nome,
         }
  
         setUser(data);
         storageUser(data);
         toast.success("Atualizado com sucesso!")
  
       })
  
     }else if(nome !== '' && imageAvatar !== null){
       // Atualizar tanto nome quanto a foto
       handleUpload()
     }
  
    }

    return(
        <div className="container">
            <Sidebar/>

            <div className="conteudo-principal">

                <form className="form-profile" onSubmit={handleSubmit}>
                    
                    <label className="label-avatar">
                        <input type="file" accept="image/*" onChange={handleFile}  />
                        {avatarUrl === null ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 210 218" fill="none">
                                <path d="M174.81 166.043L178.009 161.876L173.792 158.744C155.945 145.486 131.651 136.155 105 136.155C78.3493 136.155 54.0555 145.486 36.2078 158.744L31.9906 161.876L35.19 166.043C43.5202 176.892 54.1219 185.667 66.2127 191.701C78.3028 197.733 91.5625 200.864 105 200.852C118.437 200.864 131.697 197.733 143.787 191.701C155.878 185.667 166.48 176.892 174.81 166.043ZM5.17045 108.712C5.17045 51.3552 50.0319 5.17045 105 5.17045C159.968 5.17045 204.83 51.3552 204.83 108.712C204.83 166.069 159.968 212.254 105 212.254C50.0319 212.254 5.17045 166.069 5.17045 108.712ZM66.2469 65.0527C64.1544 70.283 63.0795 75.8829 63.0795 81.5341C63.0795 92.9398 67.4541 103.913 75.2948 112.031C83.1415 120.155 93.8229 124.754 105 124.754C116.177 124.754 126.859 120.155 134.705 112.031C142.546 103.913 146.92 92.9398 146.92 81.5341C146.92 75.8829 145.846 70.283 143.753 65.0527C141.661 59.8222 138.589 55.0582 134.705 51.0372C130.821 47.0158 126.2 43.8159 121.102 41.6293C116.002 39.4425 110.531 38.3144 105 38.3144C99.4695 38.3144 93.9977 39.4425 88.8985 41.6293C83.7998 43.8159 79.1789 47.0158 75.2948 51.0372C71.4111 55.0582 68.3395 59.8222 66.2469 65.0527Z" fill="#1D3485" stroke="#1D3485" stroke-width="10.3409"/>
                            </svg>
                        ) : (
                        <img src={avatarUrl} alt="Foto de perfil" width={250} height={250}/>
                        )}
                    </label>

                    <input type="text" value={nome} onChange={(e) =>  setNome(e.target.value)}/>

                    <input type="text" value={email} disabled={true} />

                    <input type="password" placeholder="********" value={password} disabled={true} />
                    
                    <button className="btn-save" type="submit">Salvar</button>

                </form>
                
            </div>
        </div>
    );
}