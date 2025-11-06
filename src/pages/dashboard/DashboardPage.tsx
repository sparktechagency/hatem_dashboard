import IncomeOverviewChart from "@/components/dashboard/IncomeOverviewChart";
import UserOverviewChart from "@/components/dashboard/UserOverviewChart";
import RecentOrderList from "@/components/dashboard/RecentOrderList";
import StatsSection from "@/components/dashboard/StatsSection";
import { useGetStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import type React from "react";
import DashboardLoading from "@/components/loader/DashboardLoading";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import AuthenticationCard from "@/components/card/AuthenticationCard";


const DashboardPage = () => {
  const { data, isLoading, isError, error} = useGetStatsQuery(undefined);
  const fetchError = error as FetchBaseQueryError;

  let content:React.ReactNode;

  if(isLoading){
    content = <DashboardLoading/>
  }

  if(!isLoading && data?.data && !isError){
    content = (
      <>
       <StatsSection/>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
          <IncomeOverviewChart/>
          <UserOverviewChart/>
        </div>
      </>
    )
  }


  if (!isLoading && isError && fetchError?.status===401) {
    content = <AuthenticationCard/>
  }

  if (!isLoading && isError) {
    content = <h1>Something Went Wrong</h1>
  }

  return (
    <>
      <div>     
        {content}
        <RecentOrderList/>
      </div>
    </>
  );
}

export default DashboardPage