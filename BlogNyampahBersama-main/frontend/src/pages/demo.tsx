import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, MessageCircle, Share2, User, Settings, 
  Play, Pause, RotateCcw, Zap, Gift, Star,
  CheckCircle, AlertCircle, Info, XCircle 
} from "lucide-react";

export default function Demo() {
  const [likeCount, setLikeCount] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [coinBalance, setCoinBalance] = useState(100);
  const [userPoints, setUserPoints] = useState(250);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
      setUserPoints(prev => prev + 5);
    }
  };

  const addCoins = (amount: number) => {
    setCoinBalance(prev => prev + amount);
  };

  const showTestNotification = (type: string) => {
    (window as any).showNotif?.(`Test ${type} notification!`, type);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" id="demo-title">
            Demo Fitur JavaScript Interaktif
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Demonstrasi lengkap semua fitur JavaScript yang telah dibangun untuk Nyampah Bersama
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Listeners Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Event Listeners
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Click Events</h4>
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    onClick={() => (window as any).changeHeroTitle?.("Judul Berubah!")}
                    size="sm"
                  >
                    Ubah Hero Title
                  </Button>
                  <Button 
                    onClick={() => (window as any).interactiveModals?.showModal('login-modal')}
                    size="sm"
                    variant="outline"
                  >
                    Buka Modal Login
                  </Button>
                  <Button 
                    onClick={() => (window as any).interactiveModals?.showModal('comment-modal')}
                    size="sm"
                    variant="outline"
                  >
                    Modal Komentar
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Like Button dengan State</h4>
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked 
                      ? 'bg-red-100 text-red-600 border border-red-200' 
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                  data-post-like="demo"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="like-count">{likeCount}</span>
                  <span className="text-sm">likes</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Form Handlers Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                Form Handlers & Validation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Form dengan Validasi</h4>
                <form 
                  id="demo-form" 
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const email = formData.get('email') as string;
                    const name = formData.get('name') as string;
                    
                    if (!email || !email.includes('@')) {
                      alert('Email tidak valid!');
                      return;
                    }
                    if (!name || name.length < 2) {
                      alert('Nama minimal 2 karakter!');
                      return;
                    }
                    
                    (window as any).showNotif?.('Form berhasil dikirim!', 'success');
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama lengkap"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <Button type="submit" size="sm" className="w-full">
                    Kirim Form
                  </Button>
                </form>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Search Input dengan Event</h4>
                <input
                  type="text"
                  placeholder="Ketik untuk mencari..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => {
                    if (e.target.value.length > 3) {
                      (window as any).showNotif?.(`Mencari: ${e.target.value}`, 'info');
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Variables & Conditional Logic */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-purple-500" />
                Variables & Conditional Logic
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">User State Management</h4>
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Poin:</span>
                    <Badge variant="secondary">{userPoints}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>NyampahCoin:</span>
                    <Badge className="bg-yellow-500">{coinBalance}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <Badge className="bg-green-600">
                      {userPoints > 500 ? 'Expert' : userPoints > 200 ? 'Intermediate' : 'Beginner'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Conditional Actions</h4>
                <div className="space-y-2">
                  <Button 
                    onClick={() => {
                      if (coinBalance >= 10) {
                        setCoinBalance(prev => prev - 10);
                        setUserPoints(prev => prev + 20);
                        (window as any).showNotif?.('Berhasil menukar coin dengan poin!', 'success');
                      } else {
                        (window as any).showNotif?.('Coin tidak cukup!', 'error');
                      }
                    }}
                    size="sm" 
                    className="w-full"
                  >
                    Tukar 10 Coin → 20 Poin
                  </Button>
                  <Button 
                    onClick={() => addCoins(25)}
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                  >
                    Bonus 25 Coin
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loops & Animations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-green-500" />
                Loops & Animations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Counter Animation</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-green-600" data-counter="150">150</p>
                    <p className="text-xs text-gray-600">Members</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600" data-counter="87">87</p>
                    <p className="text-xs text-gray-600">Posts</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600" data-counter="42">42</p>
                    <p className="text-xs text-gray-600">Projects</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Progress Bar Animation</h4>
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full transition-all duration-1000" data-progress="75" style={{width: '75%'}}></div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-1000" data-progress="60" style={{width: '60%'}}></div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full transition-all duration-1000" data-progress="90" style={{width: '90%'}}></div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  // Simulate animation restart
                  const progressBars = document.querySelectorAll('[data-progress]');
                  progressBars.forEach((bar: any) => {
                    bar.style.width = '0%';
                    setTimeout(() => {
                      const target = bar.getAttribute('data-progress');
                      bar.style.width = target + '%';
                    }, 100);
                  });
                }}
                size="sm" 
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart Animations
              </Button>
            </CardContent>
          </Card>

          {/* Notifications Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-orange-500" />
                Notifications System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Different Notification Types</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => showTestNotification('success')}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Success
                  </Button>
                  <Button 
                    onClick={() => showTestNotification('error')}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Error
                  </Button>
                  <Button 
                    onClick={() => showTestNotification('warning')}
                    size="sm"
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Warning
                  </Button>
                  <Button 
                    onClick={() => showTestNotification('info')}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Info className="h-4 w-4 mr-1" />
                    Info
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme & Storage Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-600" />
                Theme & Local Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Theme Toggle</h4>
                <Button 
                  onClick={() => (window as any).nyampahInteractive?.toggleTheme()}
                  size="sm"
                  className="w-full"
                >
                  Toggle Dark/Light Mode
                </Button>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Local Storage Test</h4>
                <div className="space-y-2">
                  <Button 
                    onClick={() => {
                      localStorage.setItem('demo_data', JSON.stringify({
                        timestamp: new Date().toISOString(),
                        message: 'Hello from Nyampah Bersama!'
                      }));
                      (window as any).showNotif?.('Data saved to localStorage!', 'success');
                    }}
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    Save Data
                  </Button>
                  <Button 
                    onClick={() => {
                      const data = localStorage.getItem('demo_data');
                      if (data) {
                        const parsed = JSON.parse(data);
                        (window as any).showNotif?.(`Loaded: ${parsed.message}`, 'info');
                      } else {
                        (window as any).showNotif?.('No data found!', 'warning');
                      }
                    }}
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    Load Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Console Commands */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Console Commands untuk Testing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <p># Buka Developer Console (F12) dan coba command ini:</p>
              <br />
              <p>changeHeroTitle("Judul Baru!");</p>
              <p>addPoin(50);</p>
              <p>showNotif("Hello World!", "success");</p>
              <p>nyampahInteractive.toggleTheme();</p>
              <p>nyampahInteractive.addPoin(100);</p>
              <p>interactiveModals.showModal("login-modal");</p>
              <br />
              <p># Lihat semua element yang tersedia:</p>
              <p>console.log(document.querySelectorAll('[id]'));</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}