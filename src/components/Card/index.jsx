import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import './style.css'


export function Card(){
    const [dados, setDados] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    async function getInfosPokemon(){
        try {
            setIsLoading(true)
            const {data} = await api.get('/ditto')
            setDados(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getInfosPokemon()
    }, [])

    return (
        <div className='card'>
                {isLoading && <span>Loading...</span>}
                {
                    !isLoading &&
                    <div style={{display: 'flex'}}>
                    {dados && <img src={dados.sprites.front_default} />}
                    <div style={{flexDirection: 'column'}}>
                        <h3>Habilidades</h3>
                        {dados && dados.abilities.map((abilitie, index)=> {
                            return (
                            <a href = {abilitie.ability.url}  key={index}><p style={{color: 'red'}}>{abilitie.ability.name}</p></a>
                            )
                        })}
                    </div>
                </div>
                }
        </div>
    )
}

