import {
   faTrash,
   faSignOutAlt,
   faEdit,
   faPlusCircle,
   faMinusCircle,
   faLock,
   faLink,
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
      faPlusCircle,
      faMinusCircle,
      faLock,
      faLink,
      faBars,
      faTimes,
      faUser,
      faFileExcel
   );
};

export default Icons;