import { Heading } from "@/components";
import { SatelliteAltRounded } from "@mui/icons-material";

type Props = {};

export const Logo = (props: Props) => {
  return (
    <div className="flex flex-row items-center gap-2 rounded-lg">
      <SatelliteAltRounded
        fontSize="inherit"
        className="icon-xl text-primary"
      />
      <Heading className="text-3xl font-semibold">
        People<span className="text-primary">Orbit</span>
      </Heading>
    </div>
  );
};
