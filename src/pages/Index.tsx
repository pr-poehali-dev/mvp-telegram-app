import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'Shield',
      title: 'Безопасность',
      description: 'Надёжная защита ваших данных и конфиденциальность'
    },
    {
      icon: 'Zap',
      title: 'Быстро',
      description: 'Моментальное рассмотрение заявок и обработка данных'
    },
    {
      icon: 'Users',
      title: 'Поддержка',
      description: 'Круглосуточная помощь и консультации'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <nav className="p-6 flex items-center justify-between max-w-7xl mx-auto animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center shadow-lg">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CreditApp
            </span>
          </div>
          <Button 
            onClick={() => navigate('/login')}
            variant="outline" 
            className="border-primary/30 hover:bg-primary/10"
          >
            <Icon name="LogIn" size={18} className="mr-2" />
            Войти
          </Button>
        </nav>

        <section className="max-w-7xl mx-auto px-6 py-20 text-center animate-fade-in">
          <div className="mb-6">
            <span className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-semibold">
              ✨ Новая платформа для заявок
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Простой способ
            </span>
            <br />
            подать заявку
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Быстрая регистрация, удобная форма и моментальные уведомления. 
            Всё, что нужно для работы с заявками.
          </p>

          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => navigate('/login')}
              size="lg"
              className="gradient-bg hover:opacity-90 transition-opacity shadow-2xl text-white text-lg px-8 py-6"
            >
              Начать работу
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-primary/30 hover:bg-primary/10 text-lg px-8 py-6"
            >
              <Icon name="Play" size={20} className="mr-2" />
              Как это работает
            </Button>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} size={24} className="text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <Card className="glass-effect border-primary/20 shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="flex flex-col justify-center space-y-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Как это работает?
                </h2>
                <div className="space-y-4">
                  {[
                    { step: '01', text: 'Зарегистрируйтесь или войдите в систему' },
                    { step: '02', text: 'Выберите сумму от 1 до 10 000 000 рублей' },
                    { step: '03', text: 'Отправьте заявку одним нажатием' },
                    { step: '04', text: 'Получите уведомление о статусе' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 gradient-bg rounded-lg flex items-center justify-center text-white font-bold">
                        {item.step}
                      </div>
                      <p className="text-lg text-foreground/90 pt-2">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-square max-w-md">
                  <div className="absolute inset-0 gradient-bg rounded-3xl opacity-20 blur-2xl"></div>
                  <div className="relative glass-effect rounded-3xl p-8 flex items-center justify-center h-full border-primary/30">
                    <Icon name="Rocket" size={120} className="text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Готовы начать?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Присоединяйтесь к тысячам пользователей уже сегодня
          </p>
          <Button 
            onClick={() => navigate('/login')}
            size="lg"
            className="gradient-bg hover:opacity-90 transition-opacity shadow-2xl text-white text-lg px-12 py-6"
          >
            Создать аккаунт
            <Icon name="Sparkles" size={20} className="ml-2" />
          </Button>
        </section>

        <footer className="border-t border-primary/20 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
            <p className="text-muted-foreground">© 2024 CreditApp. Все права защищены.</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                О нас
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                Контакты
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                Помощь
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
