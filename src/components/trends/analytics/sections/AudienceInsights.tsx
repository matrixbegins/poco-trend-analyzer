import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { TrendAnalytics } from "@/data/analyticsData";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

interface AudienceInsightsProps {
  data: TrendAnalytics['audienceInsights'];
}

const COLORS = ['#9b87f5', '#f59b87', '#87f59b', '#f587e4'];
const geoUrl = "https://raw.githubusercontent.com/subyfly/topojson/refs/heads/master/world-countries.json";

const colorScale = scaleLinear<string>()
  .domain([0, 40])
  .range(["#f3f4f6", "#9b87f5"]);

export function AudienceInsights({ data }: AudienceInsightsProps) {
  const getRegionPercentage = (regionName: string) => {
    const region = data.geoDistribution.find(r => r.region === regionName);
    return region?.percentage || 0;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Demographics Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Age Demographics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.demographics}
                  dataKey="percentage"
                  nameKey="group"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {data.demographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {data.demographics.map((demo, index) => (
              <div key={demo.group} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600">
                  {demo.group}: {demo.percentage}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Geographic Distribution Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Geographic Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] relative">
            <ComposableMap projectionConfig={{ scale: 120 }}>
              <ZoomableGroup center={[0, 0]} zoom={1}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const regionName = geo.properties.name;
                      const percentage = getRegionPercentage(regionName);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={colorScale(percentage)}
                          stroke="#D6D6DA"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { fill: '#9b87f5', outline: 'none' },
                            pressed: { outline: 'none' },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {data.geoDistribution.map((geo, index) => (
              <div key={geo.region} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colorScale(geo.percentage) }}
                />
                <span className="text-sm text-gray-600">
                  {geo.region}: {geo.percentage}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Interest Affinities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.interests.map((interest, index) => (
              <div
                key={interest.name}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="text-sm font-medium text-gray-600">{interest.name}</div>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-2xl font-bold">{interest.affinity}</span>
                  <span className="text-sm text-gray-500">affinity score</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

