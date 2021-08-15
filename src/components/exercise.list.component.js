import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = ({exercise, deleteExercise}) => (
    <tr>
        <td>{exercise.username}</td>
        <td>{exercise.description}</td>
        <td>{exercise.duration}</td>
        <td>{exercise.date.substring(8,10)}</td>
        <td>
            <Link to={"/edit/"+exercise._id}>edit</Link> | <a href="#" onClick={() => { deleteExercise(exercise._id)}}>delete</a>
        </td>

    </tr>
)

const ExercisesList = () => {

    const [exercises, setExercises] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/exercises')
        .then(response => {
            setExercises(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(res => console.log(res.data));
        setExercises(exercises.filter(el => el._id !== id))
    }

    const exerciseList = () => {
        return exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>;
        })
    }
    return (
        <div>
           <h3>Logged Exrcises</h3>
               <table className="table">
                   <thed className="thed-light">
                       <tr>
                           <th>Username</th>
                           <th>Description</th>
                           <th>Duration</th>
                           <th>Date</th>
                           <th>Actions</th>
                       </tr>
                   </thed>
                   <tbody>
                       {exerciseList() }
                   </tbody>
               </table>
            </div>
    );
}

export default ExercisesList;
