import History from "history";

interface Props {
  id?                : string;
  className?         : string;
  target?            : string;
  to?                : History.LocationDescriptor<string>;
  href?              : string;
  disabled?          : boolean;
  onClick?           : any; //() => void;
  dataTrack?         : string;
  dataTrackDetail?   : string;
  dataTrackAction?   : string;
  dataTrackSubAction?: string;
};

type PropsWithChildren = React.PropsWithChildren<Props>;

export default PropsWithChildren;
