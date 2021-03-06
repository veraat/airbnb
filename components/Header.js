import Image from "next/image"
import { useState } from "react"
import {GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon, UsersIcon} from "@heroicons/react/solid"

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/dist/client/router";


function Header({placeholder = "Start your search"}) {
    const [searchInput, setSearchInput] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuest] = useState(1);
    const router = useRouter();


    const selectionRange = {

        startDate:startDate,
        endDate: endDate,
        key:"selection",
    }

    const search = () => {
        router.push({
            pathname: "/search",
            query:{
                location:searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests,
            }
        })
        setSearchInput("");
    }

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }


    const resetInput = () => {
        setSearchInput("");
    }
    return (
        <header className=" sticky top-0 z-50 grid grid-cols-3 bg-white shadow p-5">

            {/* Left */}
            <div onClick={() => router.push("/")} className="
            relative 
            flex 
            items-center 
            h-10 
            cursor-pointer">
                <Image 
                src="https://links.papareact.com/qd3"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
                />
            </div>

            {/* Middle */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input className="flex-grow pl-5 bg-transparent outline-none"
                value={searchInput}
                onChange={ (e) => setSearchInput(e.target.value)} 
                type="text"
                placeholder={placeholder}/>
                
                <SearchIcon 
                className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"
                />
            </div>

            {/* Right */}
            <div className="flex items-center space-x-4 justify-end text-gray-500"> 
                <p className=" hidden md:line cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer"/>

                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                <MenuIcon className="h-6" />
                <UserCircleIcon className="h-6" />
                </div>
            </div>
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto ">
                   <DateRangePicker 
                   ranges={[selectionRange]} 
                   minDate={new Date()}
                   rangeColors={["#FD5B61"]}
                   onChange={handleSelect}
                   />

                <div className="flex items-center justify-between">
                    <h2 className="text-2xlflex-grow font-semibold">Number of guests</h2>
                    <div className="flex">
                        <UsersIcon className="h-5 mt-1" />
                        <input 
                        value={noOfGuests} 
                        onChange={(e) => setNoOfGuest(e.target.value)} 
                        min={1}
                        type="number" 
                        className="w-12 pl-2  text-lg outline-none text-red-400" />
                    </div>
                </div>

                <div className="flex">
                    <button className="flex-grow text-gray-500" onClick={resetInput}>Cancel</button>
                    <button className="flex-grow text-red-400" onClick={search}>Search</button>
                </div>
                </div>

            )}
        </header>
    )
}

export default Header;
