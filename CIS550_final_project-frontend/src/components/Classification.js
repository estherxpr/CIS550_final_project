import React,{useState, useEffect} from "react";
import {getOrdersByCategory, getFamilysByOrder} from "../data/fetch";
import {

    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,

  } from "reactstrap";



function Classification(props){
    const {updateCategory,updateOrder,updateFamily} = props;
    const [category, setCategory] = useState("");
    const [order, setOrder] = useState("");
    const [family, setFamily] = useState("");
    const [genus, setGenus] = useState("");
    const categoryList = ["Algae","Amphibian","Bird","Malacostraca","Fish","Fungi","Insect","Invertebrate","Mammal","Nonvascular Plant","Reptile","Gastropoda","Arachnida","Vascular Plant"];
    const [orderList, setOrderList] = useState([]);
    const [familyList, setFamilyList] = useState([]);


    const handleSelectCategory = (event) => {
        const selectedCategory = event.target.innerText;
        setCategory(selectedCategory);
        updateCategory(selectedCategory);
        updateOrder("");
        updateFamily("");
    }

    const handleSelectOrder = (event) => {
        const selectedOrder = event.target.innerText;
        setOrder(selectedOrder);
        updateOrder(selectedOrder);
        updateFamily("")
    }
    const handleSelectFamily = (event) => {
        const selectedFamily = event.target.innerText;
        setFamily(selectedFamily);
        updateFamily(selectedFamily);
    }

    // const handleSelectGenus = (event) => {
    //     const selectedGenus = event.target.innerText;
    //     setGenus(selectedGenus);
        
    // }

    //get all orders by category
    useEffect(()=>{
        const getOrderList = async () => {
            try{
                const orderList = await getOrdersByCategory(category);
                setOrderList(orderList);
                setOrder("");
                setFamily("");
            }catch(error){
                console.log(error);
            }
        }
        if(category !== ""){
            getOrderList();
        }
    },[category]);

    useEffect(()=>{
        const getFamilyList = async () => {
            try{
                const familyList = await getFamilysByOrder(order);
                setFamilyList(familyList);
                setFamily("");
            }catch(error){
                console.log(error);
            }
        }

        if(order !== ""){
            getFamilyList();
        }
    },[order]);


    // useEffect(()=>{
    //     const getGenusList = async () => {
    //         try{
    //             const genusList = await getFamilysByOrder(family);
    //             setGenusList(genusList);
    //             setGenus("");
    //         }catch(error){
    //             console.log(error);
    //         }
    //     }

    //     if(family !== ""){
    //         getGenusList();
    //     }
    // },[family]);


    const OrderDropdown = () => {
        if(orderList.length === 0){
            return null;
        }
        return (
            <UncontrolledDropdown>
                <DropdownToggle caret>
                    {order === "" ? "Order" : order}
                </DropdownToggle>
                <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }} container="body">
                    {orderList.map((order, index) => {
                        return <DropdownItem key={index} onClick = {handleSelectOrder}>{order}</DropdownItem>
                    })}
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
    
    const FamilyDropdown = () => {
        if(familyList.length === 0){
            return null;
        }
        return (
            <UncontrolledDropdown>
                <DropdownToggle caret>
                    {family === "" ? "Family" : family}
                </DropdownToggle>
                <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }} container="body">
                    {familyList.map((family, index) => {
                        return <DropdownItem key={index} onClick = {handleSelectFamily}>{family}</DropdownItem>
                    })}
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

    // const GenusDropdown = () => {
    //     if(genusList.length === 0){
    //         return null;
    //     }
    //     return (
    //         <UncontrolledDropdown>
    //             <DropdownToggle caret>
    //                 {genus === "" ? "Genus" : genus}
    //             </DropdownToggle>
    //             <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }} container="body">
    //                 {genusList.map((genus, index) => {
    //                     return <DropdownItem key={index} onClick = {handleSelectGenus}>{genus}</DropdownItem>
    //                 })}
    //             </DropdownMenu>
    //         </UncontrolledDropdown>
    //     )
    // }


    return (
        <div>
            <UncontrolledDropdown>
                <DropdownToggle caret>
                    {category === "" ? "Category" : category}
                </DropdownToggle>
                <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }} container="body">
                    {categoryList.map((category, index) => {
                        return <DropdownItem key={index} onClick = {handleSelectCategory}>{category}</DropdownItem>
                    })}
                </DropdownMenu>
            </UncontrolledDropdown>
            <OrderDropdown/>
            <FamilyDropdown/>
        </div>

    )


}


export default Classification;