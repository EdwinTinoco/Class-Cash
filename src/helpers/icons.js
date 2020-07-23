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
   faUser
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
      faUser
   );
};

export default Icons;