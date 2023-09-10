import React, { useEffect, useState } from "react";
import './../../style.css';
import './style.css';
import Sidebar from "../../Components/Sidebar";

import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, limit, startAfter, query} from 'firebase/firestore'
import { db } from '../../Services/firebaseConnection'


const listRef = collection(db, "notas")
export default function Minhas_Notas(){


    const [notas, setNotas] = useState([])
    const [loading, setLoading] = useState(true);

    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()
    const [loadingMore, setLoadingMore] = useState(false);
  
  
    useEffect(() => {
      async function loadnotas(){
        const q = query(listRef, orderBy('created', 'desc'), limit(5));
  
        const querySnapshot = await getDocs(q)
        setNotas([]);
  
        await updateState(querySnapshot)
  
        setLoading(false);
  
      }
  
      loadnotas();
  
  
      return () => { }
    }, [])
  
  
    async function updateState(querySnapshot){
      const isCollectionEmpty = querySnapshot.size === 0;
  
      if(!isCollectionEmpty){
        let lista = [];
  
        querySnapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            situacao: doc.data().situacao,
            disciplina: doc.data().disciplina,
            nota: doc.data().nota,
          })
        })
  
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] // Pegando o ultimo item
  
        setNotas(notas => [...notas, ...lista])
        setLastDocs(lastDoc);
  
      }else{
        setIsEmpty(true);
      }
  
      setLoadingMore(false);
  
    }
  
  
  
    if(loading){
      return(
        <div>
            <h1>Buscando notas...</h1>
        </div>
      )
    }

    return(
        <div className="container">
            <Sidebar/>
            <div className="conteudo-principal">

                <div className="titulo-minhasN"><h1>Minhas Notas:</h1></div>
                <>
                    {notas.length === 0 ? (
                        <div className="">
                            <h1>Nenhum registro encontrado...</h1>
                            <Link to="/dashboard" className="btn">
                                <button>Adicionar Nota </button>
                            </Link>  
                            </div>
                        ) : (
                    <>
                        <table className="container-tabela">
                            <thead>
                            <tr className="cabecalho">
                                <th>Disciplina</th>
                                <th>Situação</th>
                                <th>Nota</th>
                            </tr>
                            </thead>
                            <tbody>
                        {notas.map((item, index) => {
                            return(
                                <tr key={index}>
                                    <td data-label="Disciplina">{item.disciplina}</td>
                                    <td data-label="Situacao">{item.situacao}</td>
                                    <td data-label="Nota">{item.nota}</td>
                                </tr>
                                )
                            })}
                            </tbody>
                        </table>   
                    </>
                    )}
                </> 
            </div>
        </div>
    );
}