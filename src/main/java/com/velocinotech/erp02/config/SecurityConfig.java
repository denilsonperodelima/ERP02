package com.velocinotech.erp02.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.velocinotech.erp02.security.JWTAuthenticationFilter;
import com.velocinotech.erp02.security.JWTAuthorizationFilter;
import com.velocinotech.erp02.security.JWTUtil;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
    private Environment env;
	
	@Autowired
	private JWTUtil jwtUtil;

	private static final String[] PUBLIC_MATCHERS = {
			"/h2-console/**",
			"/index**",
			"/resources/**",			
			"/index.html",
			"/*.html",
			"/login**"
	};

	private static final String[] PUBLIC_MATCHERS_GET = {
			"/empresa/arpz**"
			,"/usuario/enviararpz**"	
			,"/fornecedor/**"   //TIRAR
			,"/vendedor/**"   //TIRAR	
			,"/produto/**"   //TIRAR		
			,"/endereco/**"	//tirar
			,"/banco/**"	//tirar
			,"/pedidos/**"	//tirar
			,"/itempedido/**"	//tirar		
			,"/pessoa/**"	//tirar	
	};

	private static final String[] PUBLIC_MATCHERS_POST = {
			"/index.html"
			,"/empresa/arpz**"
			,"/login**"		
			,"/usuario/enviararpz/**"			
			,"/contato/**"	//tirar				
			,"/endereco/**"	//tirar
			,"/contatotipo/**"	//tirar		
			,"/fornecedor/**"   //TIRAR		
			,"/vendedor/**"   //TIRAR	
			,"/produto/**"   //TIRAR				
			,"/banco/**"	//tirar		
			,"/pedidos/**"	//tirar		
			,"/itempedido/**"	//tirar				
	};

	private static final String[] PUBLIC_MATCHERS_PUT = {
			"/index.html"
			,"/empresa/arpz**"
			,"/login**"	
			,"/usuario/enviararpz**"	
	};

	private static final String[] PUBLIC_MATCHERS_DELETE = {
			"/index.html"
			,"/empresa/arpz**"
			,"/login**"		
			,"/usuario/enviararpz**"	
	};
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		if (Arrays.asList(env.getActiveProfiles()).contains("test")) {
            http.headers().frameOptions().disable();
        }
		
		http.cors().and().csrf().disable();
		http.authorizeRequests()
			.antMatchers(HttpMethod.POST, PUBLIC_MATCHERS_POST).permitAll()
			.antMatchers(HttpMethod.GET, PUBLIC_MATCHERS_GET).permitAll()
			.antMatchers(HttpMethod.PUT, PUBLIC_MATCHERS_PUT).permitAll()
			.antMatchers(HttpMethod.DELETE, PUBLIC_MATCHERS_DELETE).permitAll()
			.antMatchers(PUBLIC_MATCHERS).permitAll()
			.anyRequest().authenticated();
		
			// pero fez isso
			//.anyRequest().authenticated().and().formLogin().loginPage("/index.html").permitAll();
			// pero fez isso
			
		http.addFilter(new JWTAuthenticationFilter(authenticationManager(), jwtUtil));
		http.addFilter(new JWTAuthorizationFilter(authenticationManager(), jwtUtil, userDetailsService));
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}
	

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
		configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE", "OPTIONS"));
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	/*
	@Bean
	public FilterRegistrationBean filterRegistrationBean() {
	    FilterRegistrationBean registrationBean = new FilterRegistrationBean();
	    CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
	    characterEncodingFilter.setEncoding("UTF-8");
	    registrationBean.setFilter(characterEncodingFilter);
	    return registrationBean;
	}
	*/
	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
	}
	
	}