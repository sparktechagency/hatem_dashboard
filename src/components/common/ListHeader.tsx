import { RefreshCw, Search } from "lucide-react";
import { Input } from "../ui/input";
import type React from "react";

type TProps = {
    total: number;
    title: string;
    searchQuery?: string;
    setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
    children?: React.ReactNode;
    onRefresh?: () => void;
    isFetching?: boolean;
    isLoading?: boolean;
    leftField?: React.ReactNode;
}

const ListHeader = ({ total, title, searchQuery, setSearchQuery, children, onRefresh, isFetching, isLoading, leftField }: TProps) => {

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
                    {
                        leftField && (
                            <> {leftField} </>
                        )
                    }
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
                    {onRefresh && (
                        <button
                            onClick={onRefresh}
                            disabled={isFetching}
                            className={`w-full sm:w-auto px-4 cursor-pointer py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2`}
                            title="Refresh orders"
                        >
                            <RefreshCw className={`h-4 w-4 sm:h-6 sm:w-6 ${!isLoading && isFetching && 'animate-spin'}`} />
                            <span className="sm:hidden">Refresh</span>
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default ListHeader;