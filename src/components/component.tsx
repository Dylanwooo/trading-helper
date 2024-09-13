"use client";

import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Anchor, Compass, TrendingUp } from "lucide-react";

export default function Component() {
  const [riskPercentage, setRiskPercentage] = useState("1");
  const [accountBalance, setAccountBalance] = useState("10000");
  const [entryPrice, setEntryPrice] = useState("");
  const [takeProfitPrice, setTakeProfitPrice] = useState("");
  const [stopLossPrice, setStopLossPrice] = useState("");
  const [customRisk, setCustomRisk] = useState("");
  const [leverage, setLeverage] = useState("1");

  const [maxRisk, setMaxRisk] = useState(0);
  const [positionSize, setPositionSize] = useState(0);
  const [stopLossPercentage, setStopLossPercentage] = useState(0);
  const [rr, setRR] = useState(0);

  useEffect(() => {
    const balance = parseFloat(accountBalance) || 0;
    const risk =
      riskPercentage === "custom"
        ? parseFloat(customRisk) || 0
        : parseFloat(riskPercentage);
    const maxRiskValue = (balance * risk) / 100;
    setMaxRisk(maxRiskValue);

    const entry = parseFloat(entryPrice) || 0;
    const stopLoss = parseFloat(stopLossPrice) || 0;
    const takeProfit = parseFloat(takeProfitPrice) || 0;
    const leverageValue = parseFloat(leverage) || 1;

    if (entry && stopLoss) {
      const slPercentage = Math.abs((entry - stopLoss) / entry) * 100;
      setStopLossPercentage(slPercentage);

      if (maxRiskValue && slPercentage) {
        const size =
          maxRiskValue / ((slPercentage / 100) * entry) / leverageValue;
        setPositionSize(size);
      }

      if (takeProfit) {
        const tpPercentage = Math.abs((takeProfit - entry) / entry) * 100;
        setRR(tpPercentage / slPercentage);
      } else {
        setRR(0);
      }
    } else {
      setStopLossPercentage(0);
      setPositionSize(0);
      setRR(0);
    }
  }, [
    riskPercentage,
    accountBalance,
    entryPrice,
    takeProfitPrice,
    stopLossPrice,
    customRisk,
    leverage,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 flex items-center justify-center p-4">
      <Analytics />
      <Card className="w-full max-w-2xl bg-blue-800 text-blue-100 shadow-lg">
        <CardHeader className="border-b border-blue-700">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Anchor className="w-6 h-6" />
            Deep Sea Trading Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="risk-percentage" className="text-blue-200">
                Risk Percentage
              </Label>
              <Select
                value={riskPercentage}
                onValueChange={(value) => setRiskPercentage(value)}
              >
                <SelectTrigger
                  id="risk-percentage"
                  className="bg-blue-700 border-blue-600 text-blue-100"
                >
                  <SelectValue placeholder="Select risk percentage" />
                </SelectTrigger>
                <SelectContent className="bg-blue-700 text-blue-100">
                  <SelectItem value="1">1%</SelectItem>
                  <SelectItem value="2">2%</SelectItem>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              {riskPercentage === "custom" && (
                <Input
                  type="number"
                  placeholder="Custom risk %"
                  value={customRisk}
                  onChange={(e) => setCustomRisk(e.target.value)}
                  className="bg-blue-700 border-blue-600 text-blue-100 placeholder-blue-300"
                />
              )}
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="account-balance" className="text-blue-200">
                  Account Balance
                </Label>
                <Input
                  id="account-balance"
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(e.target.value)}
                  className="bg-blue-700 border-blue-600 text-blue-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leverage" className="text-blue-200">
                  Leverage
                </Label>
                <Input
                  id="leverage"
                  type="number"
                  value={leverage}
                  onChange={(e) => setLeverage(e.target.value)}
                  className="bg-blue-700 border-blue-600 text-blue-100"
                  min="1"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="entry-price" className="text-blue-200">
                Entry Price
              </Label>
              <Input
                id="entry-price"
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                className="bg-blue-700 border-blue-600 text-blue-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="take-profit" className="text-blue-200">
                Take Profit Price
              </Label>
              <Input
                id="take-profit"
                type="number"
                value={takeProfitPrice}
                onChange={(e) => setTakeProfitPrice(e.target.value)}
                className="bg-blue-700 border-blue-600 text-blue-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stop-loss" className="text-blue-200">
                Stop Loss Price
              </Label>
              <Input
                id="stop-loss"
                type="number"
                value={stopLossPrice}
                onChange={(e) => setStopLossPrice(e.target.value)}
                className="bg-blue-700 border-blue-600 text-blue-100"
              />
            </div>
          </div>
          <div className="mt-8 space-y-4 bg-blue-900 p-4 rounded-lg">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-blue-100">
              <Compass className="w-5 h-5" />
              Trading Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-blue-300" />
                <p>
                  <span className="text-blue-300">Maximum Risk:</span> $
                  {maxRisk.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-blue-300" />
                <p>
                  <span className="text-blue-300">Stop Loss %:</span>{" "}
                  {stopLossPercentage.toFixed(2)}%
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-blue-300" />
                <p>
                  <span className="text-blue-300">Position Size:</span>{" "}
                  {positionSize.toFixed(4)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-blue-300" />
                <p>
                  <span className="text-blue-300">Risk-to-Reward:</span>{" "}
                  {rr.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-300" />
                <p>
                  <span className="text-blue-300">Leverage:</span> {leverage}x
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
