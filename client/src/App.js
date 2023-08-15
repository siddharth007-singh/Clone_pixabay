import {Route, Routes} from "react-router-dom";
import {HomeContainer} from "./Containers";
import {Header} from "./Components";

function App() {
    return (
        <>
            <div className="w-screen h-screen flex flex-col items-center justify-start">
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
