import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Application {
  id: number;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function Dashboard() {
  const [amount, setAmount] = useState([1000000]);
  const [applications, setApplications] = useState<Application[]>([
    { id: 1, amount: 500000, date: '2024-01-15', status: 'approved' },
    { id: 2, amount: 2500000, date: '2024-01-10', status: 'pending' },
  ]);
  const { toast } = useToast();

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleSubmit = async () => {
    const newApplication: Application = {
      id: applications.length + 1,
      amount: amount[0],
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    
    setApplications([newApplication, ...applications]);
    
    try {
      const response = await fetch('https://functions.poehali.dev/7818bf80-3ac1-44ab-9f66-a7146d55dc34', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail') || 'test@example.com',
          userId: Math.floor(Math.random() * 100000),
          amount: amount[0],
        }),
      });

      if (response.ok) {
        toast({
          title: "Заявка отправлена! 🚀",
          description: `Ваша заявка на ${formatAmount(amount[0])} успешно создана. Уведомление отправлено.`,
        });
      } else {
        toast({
          title: "Заявка создана",
          description: `Заявка на ${formatAmount(amount[0])} создана, но уведомление не отправлено.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Заявка создана",
        description: `Заявка на ${formatAmount(amount[0])} создана локально.`,
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Icon name="CheckCircle" size={18} className="text-green-500" />;
      case 'pending':
        return <Icon name="Clock" size={18} className="text-yellow-500" />;
      case 'rejected':
        return <Icon name="XCircle" size={18} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Одобрено';
      case 'pending':
        return 'На рассмотрении';
      case 'rejected':
        return 'Отклонено';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Личный кабинет
            </h1>
            <p className="text-muted-foreground mt-2">Управляйте своими заявками</p>
          </div>
          <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-effect border-primary/20 shadow-xl animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Plus" size={24} className="text-primary" />
                Новая заявка
              </CardTitle>
              <CardDescription>Выберите сумму и отправьте заявку</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-lg">Сумма заявки</Label>
                <div className="p-6 rounded-xl gradient-bg text-center">
                  <p className="text-5xl font-bold text-white">
                    {formatAmount(amount[0])}
                  </p>
                </div>
                <Slider
                  value={amount}
                  onValueChange={setAmount}
                  min={1}
                  max={10000000}
                  step={10000}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1 ₽</span>
                  <span>10 000 000 ₽</span>
                </div>
              </div>
              <Button 
                onClick={handleSubmit}
                className="w-full gradient-bg hover:opacity-90 transition-opacity shadow-lg text-white font-semibold text-lg py-6"
              >
                Отправить заявку
                <Icon name="Send" size={20} className="ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20 shadow-xl animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="FileText" size={24} className="text-primary" />
                История заявок
              </CardTitle>
              <CardDescription>Ваши последние заявки</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-primary">
                        {formatAmount(app.amount)}
                      </span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(app.status)}
                        <span className="text-sm font-medium">
                          {getStatusText(app.status)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={14} />
                      {new Date(app.date).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                ))}
                {applications.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Inbox" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>У вас пока нет заявок</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-effect border-primary/20 shadow-xl animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="BarChart3" size={24} className="text-primary" />
              Статистика
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Icon name="FileText" size={16} />
                  <span className="text-sm">Всего заявок</span>
                </div>
                <p className="text-3xl font-bold text-primary">{applications.length}</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-sm">Одобрено</span>
                </div>
                <p className="text-3xl font-bold text-green-500">
                  {applications.filter(a => a.status === 'approved').length}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Icon name="Clock" size={16} />
                  <span className="text-sm">В ожидании</span>
                </div>
                <p className="text-3xl font-bold text-yellow-500">
                  {applications.filter(a => a.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}