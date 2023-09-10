import React, { useContext, useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import './../../style.css';
import './style.css';
import Sidebar from "../../Components/Sidebar";
import { AuthContext } from "../../Contexts/auth";
import { db } from '../../Services/firebaseConnection'
import {collection, doc, addDoc, updateDoc} from 'firebase/firestore'

import { toast } from 'react-toastify'

export default function Dashboard(){
    const { user } = useContext(AuthContext);
  
    const [disciplina, setDisciplina] = useState('')
    const [situacao, setSituacao] = useState('Ativo')
    const [nota, setNota] = useState('')
    

    function handleChangeSelect(e){
        setSituacao(e.target.value)
      }
    
    async function handleRegister(e){
      e.preventDefault();
  
      //Registrar uma nota
      await addDoc(collection(db, "notas"), {
        created: new Date(),
        situacao: situacao,
        disciplina: disciplina,
        nota: nota,
        userId: user.uid,
      })
      .then(() => {
        toast.success("Nota registrada!")
        setDisciplina('')
      })
      .catch((error) => {
        toast.error("Ops erro ao registrar, tente mais tarde!")
        console.log(error);
      })
    }
    
    return(
        <div className="container">
            <Sidebar/>
            <div className="conteudo-principal">
                <form className="form-dashboard" onSubmit={handleRegister}>
                    <h1 className="titulo-addNota">Adicionar uma nova nota:</h1>
                    <label>Nome da Disciplina</label>
                    <input
                        type="text"
                        value={disciplina}
                        onChange={ (e) => setDisciplina(e.target.value) }
                    />

                    <label>Situacao</label>
                    <select value={situacao} onChange={handleChangeSelect}>
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                    </select>

                    <label>Nota</label>
                    <IMaskInput
                        type="text"
                        value={nota}
                        mask="00.0"
                        onChange={(e) => setNota(e.target.value)}
                    />

                    <button type="submit" className="btn-incluir">Registrar</button>
                </form>

            </div>
        </div>
    );
}