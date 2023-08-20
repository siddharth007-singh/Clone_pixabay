import {Route, Routes} from "react-router-dom";
import {HomeContainer} from "./Containers";
import {Header} from "./Components";
import {useEffect} from "react";
import {firebaseAuth} from "./config/firebase.config";
import {createNewUser} from "./sanity";

function App() {

    useEffect(() => {
        firebaseAuth.onAuthStateChanged(result=>{
            if(result){
                console.log('User', result?.providerData[0]);
                createNewUser(result?.providerData[0]).then(()=>{
                    console.log('New User Created');
                });
            }
        });
    }, []);

    return (
        <>
            <div className="w-screen min-h-screen flex flex-col items-center justify-start">
                {/*Header section*/}
                <Header/>

                {/*Content scrtion*/}
                <main className='w-full h-full flex items-center justify-center'>
                    {/*Routes*/}
                    <Routes>
                        <Route path="/" element={<HomeContainer/>}/>
                    </Routes>
                </main>
            </div>
        </>
    );
}

export default App;
