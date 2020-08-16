import {
   faTrash,
   faSignOutAlt,
   faEdit,
   faSpinner,
   faPlusCircle,
   faMinusCircle,
   faPhone,
   faEnvelope,
   faMapMarkedAlt,
   faLock,
   faLink,
   faMapMarkerAlt,
   faCalculator,
   faCamera,
   faBars,
   faTimes,
   faUser,
   faFileExcel
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
   return library.add(
      faTrash,
      faSignOutAlt,
      faEdit,
      faSpinner,
      faPlusCircle,
      faMinusCircle,
      faPhone,
      faEnvelope,
      faMapMarkedAlt,
      faLock,
      faLink,
      faMapMarkerAlt,
      faCalculator,
      faCamera,
      faBars,
      faTimes,
      faUser,
      faFileExcel
   );
};

export default Icons;