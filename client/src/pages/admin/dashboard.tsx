import {
  Area,
  AreaChart,
  Bar,
  ComposedChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dashboardCards, recentOrders, revenueSeries } from "@/admin/mock-data";

const kpiSpark = [
  { name: "Mon", value: 14 },
  { name: "Tue", value: 10 },
  { name: "Wed", value: 18 },
  { name: "Thu", value: 12 },
  { name: "Fri", value: 20 },
  { name: "Sat", value: 16 },
];

const revenueConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  orders: { label: "Orders", color: "var(--chart-2)" },
};

const sparkConfig = {
  value: { label: "Value", color: "var(--chart-3)" },
};

const statusStyle = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-emerald-50 text-emerald-600";
    case "Pending":
      return "bg-purple-50 text-purple-600";
    case "Cancel":
      return "bg-rose-50 text-rose-600";
    default:
      return "bg-blue-50 text-blue-600";
  }
};

const AdminDashboard = () => {
  return (
    <div className="space-y-8 w-full overflow-hidden">
      <div className="grid gap-4 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <Card key={card.label} className="rounded-2xl border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {card.value}
                </p>
              </div>
              <Badge
                className={`rounded-full ${
                  card.trend === "down"
                    ? "bg-rose-50 text-rose-600"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {card.delta}
              </Badge>
            </div>
            <ChartContainer
              config={sparkConfig}
              className="mt-4 h-20 w-full aspect-auto"
            >
              <AreaChart data={kpiSpark}>
                <Area
                  dataKey="value"
                  type="monotone"
                  stroke="var(--color-value)"
                  fill="var(--color-value)"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ChartContainer>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="rounded-2xl border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Revenue</h2>
            <Badge variant="outline" className="rounded-full">
              Yearly
            </Badge>
          </div>
          <ChartContainer
            config={revenueConfig}
            className="mt-6 h-64 w-full aspect-auto"
          >
            <ComposedChart data={revenueSeries}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={6} />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="var(--color-orders)"
                strokeWidth={2}
              />
            </ComposedChart>
          </ChartContainer>
        </Card>

        <Card className="rounded-2xl border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Orders</h2>
          <ChartContainer
            config={revenueConfig}
            className="mt-6 h-64 w-full aspect-auto"
          >
            <LineChart data={revenueSeries}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="var(--color-orders)"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </Card>
      </div>

      <Card className="rounded-2xl border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent orders
          </h2>
          <Badge variant="outline" className="rounded-full">
            Weekly
          </Badge>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product ID</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-semibold text-slate-900">
                    {order.product}
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>
                    <Badge
                      className={`rounded-full ${statusStyle(order.status)}`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
