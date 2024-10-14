import jws from 'jsonwebtoken';

function CreateToken(payload){
    return new Promise((resolve, reject)=>{
        jws.sign(payload, import.meta.env.SECRET_TOKEN,{ expiresIn: "1h" }, (err, token)=> {
            if(err) reject(err); 
            resolve(token); 
        });
    });
}

export default CreateToken