import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, TrendingUp, Users, Clock, Headphones, Calculator, ExternalLink } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

export default function ValiantFinance() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanTerm, setLoanTerm] = useState(5);
  const [interestRate, setInterestRate] = useState(9.5);

  const calculateRepayments = () => {
    const weeklyRate = (interestRate / 100) / 52;
    const monthlyRate = (interestRate / 100) / 12;
    
    const weeklyPayment = (loanAmount * weeklyRate) / (1 - Math.pow(1 + weeklyRate, -loanTerm * 52));
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm * 12));
    
    const totalRepaid = monthlyPayment * loanTerm * 12;
    const totalInterest = totalRepaid - loanAmount;
    
    return {
      weekly: weeklyPayment,
      monthly: monthlyPayment,
      totalInterest,
      totalRepaid
    };
  };

  const repayments = calculateRepayments();

  const reasons = [
    { icon: Clock, title: 'Fast Approvals', desc: 'Most applicants receive conditional approval within hours' },
    { icon: Users, title: 'Compare 300+ Lenders', desc: 'Valiant helps find the best loan structure for your business' },
    { icon: TrendingUp, title: 'Flexible Payment Options', desc: 'Choose weekly, fortnightly or monthly repayments' },
    { icon: Headphones, title: 'Support From a Real Broker', desc: 'Work directly with our preferred Valiant Finance broker, Zach Davis' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-white border-b border-[#DBDBDB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-[#969696]">
            <Link to={createPageUrl('TMCGHome')} className="hover:text-[#FDD202]">Home</Link>
            <span>/</span>
            <Link to={createPageUrl('FinanceOptions')} className="hover:text-[#FDD202]">Finance Options</Link>
            <span>/</span>
            <span className="text-black">Valiant Finance</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-black py-16 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={createPageUrl('FinanceOptions')} className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Finance Options
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Finance Your Coffee Van With <span className="text-[#FDD202]">Confidence</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mb-8">
            Fast approvals, flexible repayment options, and smart lending solutions powered by Valiant Finance.
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
              ✓ Trusted By 300+ Lenders
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
              ✓ Australia-Wide Coverage
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
              ✓ Tailored for Coffee Van Operators
            </div>
          </div>
        </div>
      </section>

      {/* Reasons to Use Valiant */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#FDD202]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <reason.icon className="w-8 h-8 text-[#FDD202]" />
                </div>
                <h3 className="font-bold text-black mb-2">{reason.title}</h3>
                <p className="text-sm text-[#333333]">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance Calculator */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black rounded-2xl p-8 md:p-12 text-white">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-8 h-8 text-[#FDD202]" />
              <h2 className="text-3xl font-bold">Finance Calculator</h2>
            </div>

            <div className="space-y-8">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between mb-3">
                  <Label className="text-white">Loan Amount</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-[#FDD202] text-sm">$</span>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-32 bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={([value]) => setLoanAmount(value)}
                  min={5000}
                  max={250000}
                  step={500}
                  className="[&_[role=slider]]:bg-[#FDD202] [&_[role=slider]]:border-[#FDD202]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$5,000</span>
                  <span>$250,000</span>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <div className="flex justify-between mb-3">
                  <Label className="text-white">Loan Term</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      min={1}
                      max={7}
                      className="w-24 bg-white/10 border-white/20 text-white"
                    />
                    <span className="text-gray-400 text-sm">years</span>
                  </div>
                </div>
                <Slider
                  value={[loanTerm]}
                  onValueChange={([value]) => setLoanTerm(value)}
                  min={1}
                  max={7}
                  step={1}
                  className="[&_[role=slider]]:bg-[#FDD202] [&_[role=slider]]:border-[#FDD202]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1 year</span>
                  <span>7 years</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between mb-3">
                  <Label className="text-white">Interest Rate (p.a.)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-24 bg-white/10 border-white/20 text-white"
                    />
                    <span className="text-gray-400 text-sm">%</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-[#FDD202] rounded-2xl p-8 text-black mt-8">
                <h3 className="text-2xl font-bold mb-6">Estimated Repayments</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm opacity-70 mb-1">Weekly</div>
                    <div className="text-3xl font-bold">
                      ${repayments.weekly.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-70 mb-1">Monthly</div>
                    <div className="text-3xl font-bold">
                      ${repayments.monthly.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-70 mb-1">Total Interest</div>
                    <div className="text-xl font-bold">
                      ${repayments.totalInterest.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-70 mb-1">Total Repaid</div>
                    <div className="text-xl font-bold">
                      ${repayments.totalRepaid.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center">
                These repayment amounts are estimates only. Final terms will depend on your lender assessment and credit profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Quote CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">
            Get Your <span className="text-[#FDD202]">Personalized Quote</span>
          </h2>
          <p className="text-[#333333] mb-8">
            Your enquiry goes directly to our dedicated Valiant Finance broker, Zach Davis. 
            No impact on your credit score for checking eligibility.
          </p>
          <a
            href="https://valiant.finance/quote/start?owner_id=zachariah.davis@valiant.finance&utm_source=valiant&utm_medium=email&utm_campaign=signature&utm_term=get-a-finance-quote&utm_content=shakespeare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
          >
            Get a Quick Quote
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Partnership Info */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black text-center mb-8">
            Why TMCG Partners With <span className="text-[#FDD202]">Valiant</span>
          </h2>
          <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
            <p className="text-[#333333] text-lg leading-relaxed mb-6">
              With 19+ years building mobile coffee vans, we understand the unique financing needs 
              of this industry. Coffee vans include specialized equipment like battery systems, 
              commercial appliances, and custom fit-outs that traditional lenders don't always understand.
            </p>
            <p className="text-[#333333] text-lg leading-relaxed">
              Valiant Finance specializes in tailored loan structures that account for these unique 
              requirements, helping our customers get the best possible terms for their mobile coffee business investment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}