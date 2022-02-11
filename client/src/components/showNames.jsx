import { useState, useEffect } from "react";
import axios from "axios";

export function ShowNames() {
    const [names, setNames] = useState([]);
    const [sub, setSub] = useState({ name: "" });

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);

        axios
            .get("http://localhost:8000/api/GetNames")
            .then((res) => {
                console.log(res.data);
                setNames(res.data);
                setLoading(false); 
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleDelete(e) {
        axios.delete(`http://localhost:8000/api/DeleteName/${e.target.name}`);

        setNames((data) => {
            return data.filter((name) => name._id !== e.target.name);
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const NameSubmission = {
            name: sub.name
        };

        console.log({ NameSubmission });
        axios
            .post("http://localhost:8000/api/AddName", sub)
            .then((res) => {
                setSub({ name:"" });
                console.log(res.data.message);
                axios
                    .get("http://localhost:8000/api/GetNames")
                    .then((res) => {
                        console.log(res.data);
                        setNames(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log("Error couldn't create Name");
                console.log(err.message);
            });

        
    }

    function handleChange(e) {
        setSub((sub) => ({ ...sub, [e.target.name]: e.target.value }));
    }


    return (
        <section className="container">
            <section className="contents">
                <form
                    onSubmit={handleSubmit}
                    className="form-container"
                    noValidate
                >
                    <label className="label" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={sub.name}
                        onChange={handleChange}
                        className="input"
                    />
                    
                    <button type="submit" className="button" >
                        create name
                    </button>
                </form>

                <h1>Names:</h1>
                <ul className="list-container">
                    {names.map((data) => (
                        <li key={data._id}>
                            <div className="name">
                                <h3>{data.name}</h3>
                            </div>
            
                            <div className="button-container">
                                <button name={data._id} className="button" onClick={handleDelete}>delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}