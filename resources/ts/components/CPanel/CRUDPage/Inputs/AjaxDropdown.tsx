import * as React from 'react';
import {Input, DropdownOption} from '../../../../store/Admin/CRUDPage/types';

interface Props extends Input{
    value?:DropdownOption,
    link:string,
    onChange?:(opt:DropdownOption)=>void
}

class AjaxDropdown extends React.Component<Props>{
    public render(){
        return (
            <div>
                
            </div>
        )
    }
}

export default AjaxDropdown;