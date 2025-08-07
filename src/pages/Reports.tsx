import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Users, Target, DollarSign } from "lucide-react";

export default function Reports() {
  const sourceData = [
    { name: "Website", value: 42, color: "bg-blue-500" },
    { name: "Referencias", value: 28, color: "bg-green-500" },
    { name: "LinkedIn", value: 19, color: "bg-yellow-500" },
    { name: "Instagram", value: 12, color: "bg-red-500" },
  ];
  const maxValue = Math.max(...sourceData.map((item) => item.value));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vendas</h1>
        <p className="text-muted-foreground">
          Analise seu desempenho e tendências de vendas
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Mensal
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$284,729</div>
            <p className="text-xs text-success">+20.1% no ultimo mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas fechadas</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-success">+12% no ultimo mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">134</div>
            <p className="text-xs text-warning">-2% no ultimo mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Pipeline Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fontes de melhor desempenho</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sourceData.map((source, index) => {
              const percentage = (source.value / maxValue) * 100;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm font-medium min-w-[80px]">
                    {source.name}
                  </span>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${source.color} transition-all duration-300 ease-in-out`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold min-w-[30px] text-right">
                      {source.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
