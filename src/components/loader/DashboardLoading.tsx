import IncomeOverviewLoading from "./IncomeOverviewLoading";
import StatsLoading from "./StatsLoading";
import UserOverviewLoading from "./UserOverviewLoading";

const DashboardLoading = () => {
    return (
        <>
            <StatsLoading />
            <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
                <IncomeOverviewLoading />
                <UserOverviewLoading />
            </div>
        </>
    )
}

export default DashboardLoading;