package com.velocinotech.erp02.domain.enums;

public enum Perfil {

	ADMIN(1, "ROLE_ADMIN"),	
	PAGINACLIENTE(2, "ROLE_PAGINACLIENTE"),
	SUPER(3, "ROLE_SUPER"),
    PAGINACLIENTELEITURA(4,"ROLE_PAGINACLIENTELEITURA"),
    PAGINAVENDEDOR(5,"ROLE_PAGINAVENDEDOR"),
    USUARIOSIS(6,"ROLE_USUARIOSIS"),
    PAGINAFUNCIONARIO(7,"ROLE_PAGINAFUNCIONARIO"),
    PAGINAFUNCIONARIOLEITURA(8,"ROLE_PAGINAFUNCIONARIOLEITURA");
	
	private int cod;
	private String descricao;
	
	private Perfil(int cod, String descricao) {
		this.cod = cod;
		this.descricao = descricao;
	}
	
	public int getCod() {
		return cod;
	}
	
	public String getDescricao () {
		return descricao;
	}
	
	public static Perfil toEnum(Integer cod) {
		
		if (cod == null) {
			return null;
		}
		
		for (Perfil x : Perfil.values()) {
			if (cod.equals(x.getCod())) {
				return x;
			}
		}
		
		throw new IllegalArgumentException("Id inválido: " + cod);
	}

}