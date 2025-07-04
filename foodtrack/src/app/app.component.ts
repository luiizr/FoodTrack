import { Component, type OnInit, type OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

// PrimeNG Imports
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { CarouselModule } from "primeng/carousel"
import { RatingModule } from "primeng/rating"
import { AvatarModule } from "primeng/avatar"

import { DashboardComponent } from "../components/dashboard/dashboard.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    RatingModule,
    AvatarModule,
    DashboardComponent,
  ],
  template: `
    <div *ngIf="!showDashboard">
      <!-- Navigation -->
      <nav class="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm border-b border-gray-100">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <i class="pi pi-heart-fill text-white text-xl"></i>
              </div>
              <span class="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">NutriTrack</span>
            </div>
            
            <div class="hidden md:flex items-center space-x-8">
              <a href="#features" class="text-gray-600 hover:text-green-500 transition-all duration-300 font-medium hover:scale-105">Recursos</a>
              <a href="#how-it-works" class="text-gray-600 hover:text-green-500 transition-all duration-300 font-medium hover:scale-105">Como funciona</a>
              <a href="#testimonials" class="text-gray-600 hover:text-green-500 transition-all duration-300 font-medium hover:scale-105">Depoimentos</a>
              <p-button 
                label="Começar Agora" 
                styleClass="p-button-rounded p-button-sm custom-primary-btn"
                class="ml-4 shadow-lg hover:shadow-xl transition-all duration-300"
                (onClick)="goToDashboard()">
              </p-button>
            </div>
            
            <button class="md:hidden text-gray-600 hover:text-green-500 transition-colors">
              <i class="pi pi-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero-gradient pt-20 pb-16 lg:pb-24 relative overflow-hidden">
        <!-- Background decorations -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div class="absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="text-center max-w-4xl mx-auto">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 animate-fade-in">
              Transforme sua relação com a 
              <span class="gradient-text">alimentação</span>
            </h1>
            
            <div class="text-xl sm:text-2xl text-gray-600 mb-8 h-16 flex items-center justify-center">
              <span class="mr-2">Seja mais</span>
              <span class="text-green-600 font-semibold typewriter min-w-[200px] text-left">
                {{ currentPhrase }}
              </span>
            </div>
            
            <p class="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up">
              Descubra o poder de uma alimentação consciente com nossa plataforma inteligente. 
              Monitore calorias, macros e alcance seus objetivos de saúde de forma simples e eficiente.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <p-button 
                label="Começar Gratuitamente" 
                icon="pi pi-arrow-right"
                styleClass="p-button-lg p-button-rounded custom-primary-btn"
                class="text-lg px-8 py-3 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                (onClick)="goToDashboard()">
              </p-button>
              <p-button 
                label="Ver Demo" 
                icon="pi pi-play"
                styleClass="p-button-lg p-button-rounded p-button-outlined custom-outline-btn"
                class="text-lg px-8 py-3 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              </p-button>
            </div>
          </div>
          
          <!-- Hero Image/Mockup -->
          <div class="mt-16 relative max-w-4xl mx-auto animate-float">
            <div class="bg-white rounded-2xl shadow-2xl p-4 transform hover:scale-105 transition-transform duration-500 border border-gray-100">
              <img 
                src="/placeholder.svg?height=400&width=800" 
                alt="App Interface" 
                class="w-full rounded-xl">
            </div>
            <!-- Floating elements -->
            <div class="absolute -top-4 -left-4 w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
            <div class="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-400 rounded-full animate-bounce animation-delay-1000"></div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Por que escolher o <span class="gradient-text">NutriTrack</span>?
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Recursos poderosos para revolucionar sua jornada nutricional
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let feature of features; let i = index" 
                 class="feature-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group cursor-pointer"
                 [style.animation-delay]="i * 100 + 'ms'">
              <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <i [class]="feature.icon" class="text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">{{ feature.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
              <div class="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section id="how-it-works" class="py-20 bg-white relative overflow-hidden">
        <!-- Background pattern -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0); background-size: 20px 20px;"></div>
        </div>
        
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Como <span class="gradient-text">funciona</span>?
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Apenas 3 passos simples para começar sua transformação
            </p>
          </div>
          
          <div class="grid lg:grid-cols-3 gap-12">
            <div *ngFor="let step of steps; let i = index" 
                 class="text-center group step-card"
                 [style.animation-delay]="i * 200 + 'ms'">
              <div class="relative mb-8">
                <div class="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-xl relative z-10">
                  <span class="text-white text-2xl font-bold">{{ i + 1 }}</span>
                </div>
                <!-- Connecting line -->
                <div *ngIf="i < steps.length - 1" 
                     class="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-green-300 to-blue-300 transform translate-x-1/2 -translate-y-1/2 z-0">
                </div>
                <!-- Floating decoration -->
                <div class="absolute -top-2 -right-2 w-4 h-4 bg-green-300 rounded-full animate-ping opacity-75"></div>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">{{ step.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-20 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 relative overflow-hidden">
        <!-- Animated background -->
        <div class="absolute inset-0">
          <div class="absolute inset-0 bg-black opacity-10"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 transform -skew-y-12"></div>
        </div>
        
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div *ngFor="let stat of stats; let i = index" 
                 class="group stat-card"
                 [style.animation-delay]="i * 150 + 'ms'">
              <div class="text-4xl sm:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
                {{ stat.value }}
              </div>
              <div class="text-lg opacity-90 font-medium">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Screenshots Carousel -->
      <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Conheça a <span class="gradient-text">interface</span>
            </h2>
            <p class="text-xl text-gray-600">Design intuitivo e funcionalidades poderosas</p>
          </div>
          
          <div class="carousel-container">
            <p-carousel 
              [value]="screenshots" 
              [numVisible]="3" 
              [numScroll]="1" 
              [circular]="true"
              [autoplayInterval]="3000"
              [responsiveOptions]="carouselResponsiveOptions"
              styleClass="custom-carousel">
              <ng-template let-screenshot pTemplate="item">
                <div class="p-4">
                  <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border border-gray-100 group">
                    <div class="relative overflow-hidden">
                      <img [src]="screenshot.image" [alt]="screenshot.title" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500">
                      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div class="p-6">
                      <h4 class="font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">{{ screenshot.title }}</h4>
                      <p class="text-gray-600 text-sm">{{ screenshot.description }}</p>
                    </div>
                  </div>
                </div>
              </ng-template>
            </p-carousel>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section id="testimonials" class="py-20 bg-white relative">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              O que nossos <span class="gradient-text">usuários</span> dizem
            </h2>
            <p class="text-xl text-gray-600">Histórias reais de transformação</p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let testimonial of testimonials; let i = index" 
                 class="testimonial-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group relative overflow-hidden"
                 [style.animation-delay]="i * 100 + 'ms'">
              <!-- Background decoration -->
              <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-bl-full opacity-50"></div>
              
              <div class="flex items-center mb-6 relative z-10">
                <p-avatar 
                  [image]="testimonial.avatar" 
                  shape="circle" 
                  size="large"
                  class="mr-4 shadow-lg ring-4 ring-white group-hover:ring-green-100 transition-all duration-300">
                </p-avatar>
                <div>
                  <h4 class="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">{{ testimonial.name }}</h4>
                  <p class="text-gray-600 text-sm">{{ testimonial.role }}</p>
                </div>
              </div>
              
              <p-rating 
                [ngModel]="testimonial.rating" 
                [readonly]="true" 
                class="mb-4 custom-rating">
              </p-rating>
              
              <p class="text-gray-600 italic leading-relaxed relative z-10">"{{ testimonial.comment }}"</p>
              
              <!-- Quote decoration -->
              <div class="absolute bottom-4 right-4 text-6xl text-green-100 opacity-50 font-serif">"</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 relative overflow-hidden">
        <!-- Animated background -->
        <div class="absolute inset-0">
          <div class="absolute inset-0 bg-black opacity-10"></div>
          <div class="wave-animation"></div>
        </div>
        
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronto para transformar sua alimentação?
          </h2>
          <p class="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já descobriram o poder de uma alimentação consciente
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <p-button 
              label="Começar Gratuitamente" 
              icon="pi pi-arrow-right"
              styleClass="p-button-lg p-button-rounded custom-white-btn"
              class="text-lg px-8 py-3 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              (onClick)="goToDashboard()">
            </p-button>
            <p-button 
              label="Falar com Especialista" 
              icon="pi pi-phone"
              styleClass="p-button-lg p-button-rounded p-button-outlined custom-outline-white-btn"
              class="text-lg px-8 py-3 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            </p-button>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12 relative overflow-hidden">
        <!-- Background pattern -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0); background-size: 40px 40px;"></div>
        </div>
        
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="grid md:grid-cols-4 gap-8">
            <div>
              <div class="flex items-center space-x-2 mb-4">
                <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <i class="pi pi-heart-fill text-white text-xl"></i>
                </div>
                <span class="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">NutriTrack</span>
              </div>
              <p class="text-gray-400 leading-relaxed">
                Transformando vidas através de uma alimentação consciente e inteligente.
              </p>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4 text-white">Produto</h4>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">Recursos</a></li>
                <li><a href="#" class="hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">Preços</a></li>
                <li><a href="#" class="hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4 text-white">Suporte</h4>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">Central de Ajuda</a></li>
                <li><a href="#" class="hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">Contato</a></li>
                <li><a href="#" class="hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4 text-white">Conecte-se</h4>
              <div class="flex space-x-4">
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-500 transition-all duration-300 transform hover:scale-110">
                  <i class="pi pi-facebook text-lg"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500 transition-all duration-300 transform hover:scale-110">
                  <i class="pi pi-twitter text-lg"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500 transition-all duration-300 transform hover:scale-110">
                  <i class="pi pi-instagram text-lg"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 NutriTrack. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>

    <!-- Dashboard -->
    <div *ngIf="showDashboard">
      <app-dashboard (backToHome)="showDashboard = false"></app-dashboard>
    </div>
  `,
  styles: [
    `
    .hero-gradient {
      background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #faf5ff 100%);
    }
    
    .gradient-text {
      background: linear-gradient(
        270deg,
        #10b981,
        #3b82f6,
        #a21caf,
        #f59e42,
        #10b981
      );
      background-size: 400% 400%;
      background-position: 0% 50%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
      animation: gradient-wave 8s ease-in-out infinite;
      font-weight: bold;
      letter-spacing: 0.5px;
    }

    @keyframes gradient-wave {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .typewriter {
      overflow: hidden;
      border-right: 2px solid #10b981;
      white-space: nowrap;
      animation: typewriter 2s steps(20, end);
    }

    @keyframes typewriter {
      from { width: 0; }
      to { width: 100%; }
    }

    .animate-blob {
      animation: blob 7s infinite;
    }

    .animation-delay-2000 {
      animation-delay: 2s;
    }

    .animation-delay-4000 {
      animation-delay: 4s;
    }

    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    .feature-card {
      animation: slideInUp 0.6s ease-out forwards;
      opacity: 0;
      transform: translateY(30px);
    }

    .step-card {
      animation: slideInUp 0.8s ease-out forwards;
      opacity: 0;
      transform: translateY(30px);
    }

    .stat-card {
      animation: slideInUp 0.6s ease-out forwards;
      opacity: 0;
      transform: translateY(30px);
    }

    .testimonial-card {
      animation: slideInUp 0.7s ease-out forwards;
      opacity: 0;
      transform: translateY(30px);
    }

    @keyframes slideInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fadeIn 1s ease-out;
    }

    .animate-slide-up {
      animation: slideUp 1s ease-out 0.3s both;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .wave-animation {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
      animation: wave 3s infinite;
    }

    @keyframes wave {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    /* Custom PrimeNG Button Styles */
    :host ::ng-deep .custom-primary-btn {
      background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%) !important;
      border: none !important;
      color: white !important;
      font-weight: 600 !important;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3) !important;
    }

    :host ::ng-deep .custom-primary-btn:hover {
      background: linear-gradient(135deg, #059669 0%, #1d4ed8 100%) !important;
      box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4) !important;
    }

    :host ::ng-deep .custom-outline-btn {
      border: 2px solid #10b981 !important;
      color: #10b981 !important;
      background: transparent !important;
      font-weight: 600 !important;
    }

    :host ::ng-deep .custom-outline-btn:hover {
      background: #10b981 !important;
      color: white !important;
      border-color: #10b981 !important;
    }

    :host ::ng-deep .custom-white-btn {
      background: white !important;
      color: #10b981 !important;
      border: none !important;
      font-weight: 600 !important;
    }

    :host ::ng-deep .custom-white-btn:hover {
      background: #f0fdf4 !important;
      color: #059669 !important;
    }

    :host ::ng-deep .custom-outline-white-btn {
      border: 2px solid white !important;
      color: white !important;
      background: transparent !important;
      font-weight: 600 !important;
    }

    :host ::ng-deep .custom-outline-white-btn:hover {
      background: white !important;
      color: #10b981 !important;
    }

    /* Custom Carousel Styles */
    :host ::ng-deep .custom-carousel .p-carousel-content {
      padding: 0 !important;
    }

    :host ::ng-deep .custom-carousel .p-carousel-prev,
    :host ::ng-deep .custom-carousel .p-carousel-next {
      background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%) !important;
      color: white !important;
      border: none !important;
      border-radius: 50% !important;
      width: 50px !important;
      height: 50px !important;
      box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3) !important;
    }

    :host ::ng-deep .custom-carousel .p-carousel-prev:hover,
    :host ::ng-deep .custom-carousel .p-carousel-next:hover {
      background: linear-gradient(135deg, #059669 0%, #1d4ed8 100%) !important;
      transform: scale(1.1) !important;
    }

    /* Custom Rating Styles */
    :host ::ng-deep .custom-rating .p-rating-icon {
      color: #fbbf24 !important;
      font-size: 1.2rem !important;
    }

    :host ::ng-deep .custom-rating .p-rating-icon.p-rating-icon-active {
      color: #f59e0b !important;
    }

    /* Custom Avatar Styles */
    :host ::ng-deep .p-avatar {
      transition: all 0.3s ease !important;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .feature-card,
      .step-card,
      .testimonial-card {
        margin-bottom: 2rem;
      }
    }
  `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  showDashboard = false
  currentPhrase = "saudável"
  phrases = ["saudável", "consciente", "equilibrado", "energizado", "confiante"]
  phraseIndex = 0
  phraseInterval: any

  features = [
    {
      icon: "pi pi-chart-line",
      title: "Análise Nutricional Completa",
      description: "Monitore macros, micros, calorias e todos os nutrientes essenciais para sua saúde em tempo real.",
    },
    {
      icon: "pi pi-mobile",
      title: "Scanner Inteligente",
      description:
        "Escaneie códigos de barras ou tire fotos dos alimentos para registrar automaticamente as informações nutricionais.",
    },
    {
      icon: "pi pi-heart",
      title: "Metas Personalizadas",
      description: "Defina objetivos específicos baseados no seu perfil, histórico médico e metas de saúde pessoais.",
    },
    {
      icon: "pi pi-users",
      title: "Comunidade Ativa",
      description: "Conecte-se com outros usuários, compartilhe receitas e receba suporte em sua jornada nutricional.",
    },
    {
      icon: "pi pi-calendar",
      title: "Planejamento de Refeições",
      description: "Crie planos alimentares semanais inteligentes que se adaptam às suas preferências e restrições.",
    },
    {
      icon: "pi pi-shield",
      title: "Dados Seguros",
      description: "Seus dados de saúde são protegidos com criptografia de nível hospitalar e total privacidade.",
    },
  ]

  steps = [
    {
      title: "Crie seu Perfil",
      description:
        "Adicione suas informações básicas, objetivos de saúde e preferências alimentares para personalizar sua experiência.",
    },
    {
      title: "Registre suas Refeições",
      description:
        "Use nosso scanner inteligente ou busca por alimentos para registrar o que você come de forma rápida e precisa.",
    },
    {
      title: "Acompanhe seu Progresso",
      description: "Visualize relatórios detalhados, conquiste metas e ajuste seu plano conforme seus resultados.",
    },
  ]

  stats = [
    { value: "500K+", label: "Usuários Ativos" },
    { value: "2M+", label: "Refeições Registradas" },
    { value: "95%", label: "Taxa de Sucesso" },
    { value: "4.9", label: "Avaliação Média" },
  ]

  screenshots = [
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Dashboard Principal",
      description: "Visão geral completa dos seus dados nutricionais",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Scanner de Alimentos",
      description: "Tecnologia avançada de reconhecimento",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Relatórios Detalhados",
      description: "Análises profundas do seu progresso",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Planejador de Refeições",
      description: "Organize sua semana alimentar",
    },
  ]

  testimonials = [
    {
      name: "Maria Silva",
      role: "Nutricionista",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      comment:
        "Revolucionou minha prática profissional. Meus pacientes estão mais engajados e os resultados são impressionantes!",
    },
    {
      name: "João Santos",
      role: "Atleta Profissional",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      comment:
        "Finalmente um app que entende as necessidades específicas de um atleta. Perfeito para otimizar performance!",
    },
    {
      name: "Ana Costa",
      role: "Mãe de Família",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      comment: "Consegui organizar a alimentação de toda família. As crianças agora comem mais saudável e com prazer!",
    },
  ]

  carouselResponsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "768px",
      numVisible: 1,
      numScroll: 1,
    },
  ]

  ngOnInit() {
    this.startPhraseRotation()
  }

  ngOnDestroy() {
    if (this.phraseInterval) {
      clearInterval(this.phraseInterval)
    }
  }

  startPhraseRotation() {
    this.phraseInterval = setInterval(() => {
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length
      this.currentPhrase = this.phrases[this.phraseIndex]
    }, 2000)
  }

  goToDashboard() {
    this.showDashboard = true
  }
}
