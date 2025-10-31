import { Search } from "lucide-react";
import { Input } from "../ui/input";
import type React from "react";

type TProps = {
    total: number;
    title: string;
    searchQuery?: string;
    setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
    children?: React.ReactNode;
}

const ListHeader = ({ total, title, searchQuery, setSearchQuery, children }: TProps) => {

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex justify-between items-center gap-3">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{title}</h1>
                    <div className="flex items-center">
                        <span className="text-sm sm:text-base text-gray-600">Total:</span>
                        <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full text-sm">
                            {total || 0}
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center flex-col sm:flex-row gap-4">
                    {setSearchQuery && (
                        <>
                            <div className="relative w-full sm:w-80">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search here..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </>
                    )}
                    {children}
                </div>
            </div>
        </>
    )
}

export default ListHeader;