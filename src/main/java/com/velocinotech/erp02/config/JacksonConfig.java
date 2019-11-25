package com.velocinotech.erp02.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.velocinotech.erp02.domain.Administrador;
import com.velocinotech.erp02.domain.Cliente;
import com.velocinotech.erp02.domain.Fornecedor;
import com.velocinotech.erp02.domain.Funcionario;
import com.velocinotech.erp02.domain.PagamentoComBoleto;
import com.velocinotech.erp02.domain.PagamentoComCartao;
import com.velocinotech.erp02.domain.Vendedor;

@Configuration
public class JacksonConfig {
	// https://stackoverflow.com/questions/41452598/overcome-can-not-construct-instance-ofinterfaceclass-without-hinting-the-pare
	@Bean
	public Jackson2ObjectMapperBuilder objectMapperBuilder() {
		Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder() {
			public void configure(ObjectMapper objectMapper) {
				objectMapper.registerSubtypes(PagamentoComCartao.class);
				objectMapper.registerSubtypes(PagamentoComBoleto.class);
				objectMapper.registerSubtypes(Funcionario.class);
				objectMapper.registerSubtypes(Cliente.class);
				objectMapper.registerSubtypes(Fornecedor.class);	
				objectMapper.registerSubtypes(Vendedor.class);	
				objectMapper.registerSubtypes(Administrador.class);					
				super.configure(objectMapper);
			}
		};
		return builder;
	}
}