"use client"
import SatelliteAltRoundedIcon from '@mui/icons-material/SatelliteAltRounded';
import Card from "../components/Card";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import Header3 from "../components/Header3";
import Button from '../components/Button';

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
          <p>Card when variant not specified, it takes surface</p>
        </Card>
        <Card variant="surface">
          <p>Card surface variant</p>
        </Card>
        <Card>
          <p className="py-4">Parent Card</p>
          <Card variant="surface-top">
            <p>Child Card surface-top variant</p>
          </Card>
        </Card>
        <Card variant="outlined">
          <p>Card outlined variant</p>
        </Card>
        <Card variant="outlined-primary">
          <p>Card outlined-primary variant</p>
        </Card>

        <div className="m-4"/>

        <p>Button Component</p>
        <Button onPress={() => console.log("button 1 pressed")}>Filled Button</Button>
        <Button variant="outlined" onPress={() => console.log("button 2 pressed")}>Outlined Button</Button>
        <Button>Hello World</Button>
      </div>
    </div>
  );
}
