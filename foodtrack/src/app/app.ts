import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { AvatarModule } from 'primeng/avatar';
import { TimelineModule } from 'primeng/timeline';
import { StepsModule } from 'primeng/steps';
import { TagModule } from 'primeng/tag';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

import { DashboardComponent } from '../components/dashboard/dashboard.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    RatingModule,
    AvatarModule,
    TimelineModule,
    StepsModule,
    TagModule,
    MenubarModule,
    DashboardComponent,
  ],
  template: `
    <div *ngIf="!showDashboard">
      <!-- Navigation -->
      <nav class="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-2">
              <i class="pi pi-heart-fill text-primary-500 text-2xl"></i>
              <span class="text-xl font-bold text-gray-800">NutriTrack</span>
            </div>
            
            <div class="hidden md:flex items-center space-x-8">
              <a href="#features" class="text-gray-600 hover:text-primary-500 transition-colors">Recursos</a>
              <a href="#how-it-works" class="text-gray-600 hover:text-primary-500 transition-colors">Como funciona</a>
              <a href="#testimonials" class="text-gray-600 hover:text-primary-500 transition-colors">Depoimentos</a>
              <p-button 
                label="Começar Agora" 
                styleClass="p-button-rounded p-button-sm"
                class="ml-4"
                (onClick)="goToDashboard()">
              </p-button>
            </div>
            
            <button class="md:hidden text-gray-600">
              <i class="pi pi-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero-gradient pt-20 pb-16 lg:pb-24">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-4xl mx-auto">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 animate-fade-in">
              Transforme sua relação com a 
              <span class="text-primary-500">alimentação</span>
            </h1>
            
            <div class="text-xl sm:text-2xl text-gray-600 mb-8 h-16 flex items-center justify-center">
              <span class="mr-2">Seja mais</span>
              <span class="text-primary-500 font-semibold typewriter min-w-[200px] text-left">
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
                styleClass="p-button-lg p-button-rounded gradient-bg text-white border-0"
                class="text-lg px-8 py-3"
                (onClick)="goToDashboard()">
              </p-button>
              <p-button 
                label="Ver Demo" 
                icon="pi pi-play"
                styleClass="p-button-lg p-button-rounded p-button-outlined"
                class="text-lg px-8 py-3">
              </p-button>
            </div>
          </div>
          
          <!-- Hero Image/Mockup -->
          <div class="mt-16 relative max-w-4xl mx-auto">
            <div class="bg-white rounded-2xl shadow-2xl p-4 transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="App Interface" 
                class="w-full rounded-xl">
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Por que escolher o <span class="text-primary-500">NutriTrack</span>?
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Recursos poderosos para revolucionar sua jornada nutricional
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let feature of features" 
                 class="bg-white rounded-xl p-8 shadow-lg card-hover cursor-pointer">
              <div class="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-6">
                <i [class]="feature.icon" class="text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-4">{{ feature.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section id="how-it-works" class="py-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Como <span class="text-primary-500">funciona</span>?
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Apenas 3 passos simples para começar sua transformação
            </p>
          </div>
          
          <div class="grid lg:grid-cols-3 gap-12">
            <div *ngFor="let step of steps; let i = index" 
                 class="text-center group">
              <div class="relative mb-8">
                <div class="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span class="text-white text-2xl font-bold">{{ i + 1 }}</span>
                </div>
                <div *ngIf="i < steps.length - 1" 
                     class="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 transform translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-4">{{ step.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-20 gradient-bg">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div *ngFor="let stat of stats" class="group">
              <div class="text-4xl sm:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                {{ stat.value }}
              </div>
              <div class="text-lg opacity-90">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Screenshots Carousel -->
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Conheça a <span class="text-primary-500">interface</span>
            </h2>
            <p class="text-xl text-gray-600">Design intuitivo e funcionalidades poderosas</p>
          </div>
          
          <p-carousel 
            [value]="screenshots" 
            [numVisible]="3" 
            [numScroll]="1" 
            [circular]="true"
            [autoplayInterval]="3000"
            [responsiveOptions]="carouselResponsiveOptions">
            <ng-template let-screenshot pTemplate="item">
              <div class="p-4">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img [src]="screenshot.image" [alt]="screenshot.title" class="w-full h-64 object-cover">
                  <div class="p-6">
                    <h4 class="font-semibold text-gray-800 mb-2">{{ screenshot.title }}</h4>
                    <p class="text-gray-600 text-sm">{{ screenshot.description }}</p>
                  </div>
                </div>
              </div>
            </ng-template>
          </p-carousel>
        </div>
      </section>

      <!-- Testimonials -->
      <section id="testimonials" class="py-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              O que nossos <span class="text-primary-500">usuários</span> dizem
            </h2>
            <p class="text-xl text-gray-600">Histórias reais de transformação</p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let testimonial of testimonials" 
                 class="bg-white rounded-xl p-8 shadow-lg card-hover">
              <div class="flex items-center mb-6">
                <p-avatar 
                  [image]="testimonial.avatar" 
                  shape="circle" 
                  size="large"
                  class="mr-4">
                </p-avatar>
                <div>
                  <h4 class="font-semibold text-gray-800">{{ testimonial.name }}</h4>
                  <p class="text-gray-600 text-sm">{{ testimonial.role }}</p>
                </div>
              </div>
              <p-rating 
                [ngModel]="testimonial.rating" 
                [readonly]="true" 
                class="mb-4">
              </p-rating>
              <!-- [cancel]="false" -->
              <p class="text-gray-600 italic leading-relaxed">"{{ testimonial.comment }}"</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 gradient-bg">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              styleClass="p-button-lg p-button-rounded bg-white text-primary-500 border-white hover:bg-gray-50"
              class="text-lg px-8 py-3"
              (onClick)="goToDashboard()">
            </p-button>
            <p-button 
              label="Falar com Especialista" 
              icon="pi pi-phone"
              styleClass="p-button-lg p-button-rounded p-button-outlined border-white text-white hover:bg-white/10"
              class="text-lg px-8 py-3">
            </p-button>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-4 gap-8">
            <div>
              <div class="flex items-center space-x-2 mb-4">
                <i class="pi pi-heart-fill text-primary-500 text-2xl"></i>
                <span class="text-xl font-bold">NutriTrack</span>
              </div>
              <p class="text-gray-400 leading-relaxed">
                Transformando vidas através de uma alimentação consciente e inteligente.
              </p>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4">Produto</h4>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" class="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4">Suporte</h4>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4">Conecte-se</h4>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <i class="pi pi-facebook text-xl"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <i class="pi pi-twitter text-xl"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <i class="pi pi-instagram text-xl"></i>
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
      <app-dashboard></app-dashboard>
    </div>
  `,
})
export class App implements OnInit, OnDestroy {
  showDashboard = false;
  currentPhrase = 'saudável';
  phrases = ['saudável', 'consciente', 'equilibrado', 'energizado', 'confiante'];
  phraseIndex = 0;
  phraseInterval: any;

  features = [
    {
      icon: 'pi pi-chart-line',
      title: 'Análise Nutricional Completa',
      description: 'Monitore macros, micros, calorias e todos os nutrientes essenciais para sua saúde em tempo real.'
    },
    {
      icon: 'pi pi-mobile',
      title: 'Scanner Inteligente',
      description: 'Escaneie códigos de barras ou tire fotos dos alimentos para registrar automaticamente as informações nutricionais.'
    },
    {
      icon: 'pi pi-heart',
      title: 'Metas Personalizadas',
      description: 'Defina objetivos específicos baseados no seu perfil, histórico médico e metas de saúde pessoais.'
    },
    {
      icon: 'pi pi-users',
      title: 'Comunidade Ativa',
      description: 'Conecte-se com outros usuários, compartilhe receitas e receba suporte em sua jornada nutricional.'
    },
    {
      icon: 'pi pi-calendar',
      title: 'Planejamento de Refeições',
      description: 'Crie planos alimentares semanais inteligentes que se adaptam às suas preferências e restrições.'
    },
    {
      icon: 'pi pi-shield',
      title: 'Dados Seguros',
      description: 'Seus dados de saúde são protegidos com criptografia de nível hospitalar e total privacidade.'
    }
  ];

  steps = [
    {
      title: 'Crie seu Perfil',
      description: 'Adicione suas informações básicas, objetivos de saúde e preferências alimentares para personalizar sua experiência.'
    },
    {
      title: 'Registre suas Refeições',
      description: 'Use nosso scanner inteligente ou busca por alimentos para registrar o que você come de forma rápida e precisa.'
    },
    {
      title: 'Acompanhe seu Progresso',
      description: 'Visualize relatórios detalhados, conquiste metas e ajuste seu plano conforme seus resultados.'
    }
  ];

  stats = [
    { value: '500K+', label: 'Usuários Ativos' },
    { value: '2M+', label: 'Refeições Registradas' },
    { value: '95%', label: 'Taxa de Sucesso' },
    { value: '4.9', label: 'Avaliação Média' }
  ];

  screenshots = [
    {
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Dashboard Principal',
      description: 'Visão geral completa dos seus dados nutricionais'
    },
    {
      image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Scanner de Alimentos',
      description: 'Tecnologia avançada de reconhecimento'
    },
    {
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Relatórios Detalhados',
      description: 'Análises profundas do seu progresso'
    },
    {
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Planejador de Refeições',
      description: 'Organize sua semana alimentar'
    }
  ];

  testimonials = [
    {
      name: 'Maria Silva',
      role: 'Nutricionista',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      comment: 'Revolucionou minha prática profissional. Meus pacientes estão mais engajados e os resultados são impressionantes!'
    },
    {
      name: 'João Santos',
      role: 'Atleta Profissional',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      comment: 'Finalmente um app que entende as necessidades específicas de um atleta. Perfeito para otimizar performance!'
    },
    {
      name: 'Ana Costa',
      role: 'Mãe de Família',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      comment: 'Consegui organizar a alimentação de toda família. As crianças agora comem mais saudável e com prazer!'
    }
  ];

  carouselResponsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnInit() {
    this.startPhraseRotation();
  }

  ngOnDestroy() {
    if (this.phraseInterval) {
      clearInterval(this.phraseInterval);
    }
  }

  startPhraseRotation() {
    this.phraseInterval = setInterval(() => {
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      this.currentPhrase = this.phrases[this.phraseIndex];
    }, 2000);
  }

  goToDashboard() {
    this.showDashboard = true;
  }
}

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule)
  ]
});
