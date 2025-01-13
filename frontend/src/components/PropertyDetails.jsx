import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import usePropertyDetails from "../hooks/usePropertyDetails";

const performanceData = [
  { month: "Jan", income: 4000 },
  { month: "Feb", income: 3000 },
  { month: "Mar", income: 5000 },
  { month: "Apr", income: 4500 },
  { month: "May", income: 4800 },
  { month: "Jun", income: 5200 },
];

export function PropertyDetails() {
  const { id } = useParams();
  const propertyDetails = usePropertyDetails(id);

  if (!propertyDetails) {
    return <div>Loading property details...</div>;
  }

  const soldTokensPercentage =
    (propertyDetails.soldTokens / propertyDetails.totalTokens) * 100;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {propertyDetails.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={propertyDetails.image || "https://via.placeholder.com/600x400"}
            alt={propertyDetails.name}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">
                Location: {propertyDetails.location}
              </p>
              <p className="text-gray-600 mb-2">
                Valuation: ${propertyDetails.valuation}
              </p>
              <p className="text-gray-600 mb-2">
                Token Price: ${propertyDetails.tokenPrice}
              </p>
              <p className="text-gray-600 mb-2">
                Rental Yield: {propertyDetails.rentalYield}%
              </p>
              <p className="text-gray-600 mb-2">
                Property Type: {propertyDetails.propertyType || "N/A"}
              </p>
              <p className="text-gray-600 mb-2">
                Year Built: {propertyDetails.yearBuilt || "N/A"}
              </p>
              <p className="text-gray-600 mb-2">
                Square Footage: {propertyDetails.squareFootage || "N/A"} sq ft
              </p>
              <p className="text-gray-600">
                {propertyDetails.description || "No description available."}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tokenization Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total Tokens:</span>
                <span className="font-semibold">
                  {propertyDetails.totalTokens}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Sold Tokens:</span>
                <span className="font-semibold">
                  {propertyDetails.soldTokens}
                </span>
              </div>
              <Progress value={soldTokensPercentage} className="w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Monthly Rental Income:</span>
                <span className="font-semibold">
                  ${propertyDetails.monthlyRentalIncome}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Occupancy Rate:</span>
                <span className="font-semibold">
                  {propertyDetails.occupancyRate}%
                </span>
              </div>
              <div className="h-64 mt-4">
                <ChartContainer
                  config={{
                    income: {
                      label: "Monthly Income",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="income" fill="var(--color-income)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
