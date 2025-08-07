import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (isRegistering) {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
          toast({
            variant: "destructive",
            title: "Erro no cadastro",
            description: "Por favor, preencha todos os campos",
          });
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          toast({
            variant: "destructive",
            title: "Erro no cadastro",
            description: "As senhas não coincidem",
          });
          return;
        }

        if (formData.password.length < 6) {
          toast({
            variant: "destructive",
            title: "Erro no cadastro",
            description: "A senha deve ter pelo menos 6 caracteres",
          });
          return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());

        if (existingUser) {
          toast({
            variant: "destructive",
            title: "Erro no cadastro",
            description: "Este e-mail já está cadastrado",
          });
          return;
        }

        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email.toLowerCase(),
          password: formData.password,
          role: 'user',
          createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        toast({
          title: "Sucesso!",
          description: "Conta criada com sucesso",
        });

        setFormData({ email: '', password: '', confirmPassword: '', name: '' });

        console.log(users)
        toggleForm();
      } else {
        // Validação do login
        if (!formData.email || !formData.password) {
          toast({
            variant: "destructive",
            title: "Erro no login",
            description: "Por favor, preencha todos os campos",
          });
          return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());
        
        if (!user) {
          toast({
            variant: "destructive",
            title: "Erro no login",
            description: "E-mail ou senha incorretos",
          });
          return;
        }

        
        localStorage.setItem('user', JSON.stringify(user));
        console.log(user)
        
        toast({
          title: "Bem-vindo!",
          description: "Login realizado com sucesso",
        });

        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro inesperado",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsRegistering(!isRegistering);
        setIsTransitioning(false);
      }, 200);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div 
          className={`transition-all duration-300 ease-in-out ${
            isTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
          }`}
        >
          <Card className="w-full shadow-lg border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100">
                {isRegistering ? 'Crie seu acesso' : 'Nakamura Control'}
              </CardTitle>
              <CardDescription className="text-center text-slate-600 dark:text-slate-400">
                {isRegistering 
                  ? 'Preencha seus dados para se cadastrar'
                  : 'Digite seu e-mail e senha para entrar'
                }
              </CardDescription>
            </CardHeader>
            
            <div onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {isRegistering && (
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Nome Completo
                    </Label>
                    <Input
                      id="register-name"
                      name="name"
                      placeholder="Seu Nome"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-10"
                      required={isRegistering}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-10"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Senha
                    </Label>
                    {!isRegistering && (
                      <button
                        type="button"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        onClick={() => {}}
                      >
                        Esqueceu a senha?
                      </button>
                    )}
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-10"
                    required
                  />
                </div>
                
                {isRegistering && (
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Confirmar Senha
                    </Label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="h-10"
                      required={isRegistering}
                    />
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4 pt-2">
                <Button 
                  onClick={handleSubmit}
                  className="w-full h-10 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors font-medium"
                  disabled={isLoading}
                >
                  {isLoading 
                    ? 'Carregando...' 
                    : isRegistering 
                      ? 'Cadastrar' 
                      : 'Entrar'
                  }
                </Button>
                
                <div className="text-sm text-center text-slate-600 dark:text-slate-400">
                  {isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    disabled={isTransitioning}
                  >
                    {isRegistering ? 'Fazer login' : 'Cadastre-se'}
                  </button>
                </div>
              </CardFooter>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;