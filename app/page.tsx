import SatelliteAltRoundedIcon from '@mui/icons-material/SatelliteAltRounded';
import Card from "../components/Card";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import Header3 from "../components/Header3";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-start">
      <div className="flex flex-row items-center justify-start p-2">
        <SatelliteAltRoundedIcon sx={{ fontSize: "2rem" }} className="text-primary"/>
        <h1 className="text-3xl font-bold p-2">People<span className="text-primary">Orbit</span></h1>
      </div>
      <div className="m-2 flex flex-col gap-2">
        <p>Components Demo:</p>
        <p>Header 1</p>
        <Header1>This is an example of Header 1.</Header1>
        <p>Header 2</p>
        <Header2>This is an example of Header 2.</Header2>
        <p>Header 3</p>
        <Header3>This is an example of Header 3.</Header3>
        
        <div className="m-4"/>
        
        <p>Card Component</p>
        <Card>
          <p>Card Children</p>
        </Card>
        <Card>
          <p>Card Children</p>
        </Card>
        <Card>
          <p>Card Children</p>
        </Card>

        <div className="m-4"/>


      </div>
    </div>
  );
}
