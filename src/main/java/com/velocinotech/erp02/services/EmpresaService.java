package com.velocinotech.erp02.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Empresa;
import com.velocinotech.erp02.domain.Funcionario;
import com.velocinotech.erp02.domain.Pessoa;
import com.velocinotech.erp02.domain.Usuario;
import com.velocinotech.erp02.domain.enums.Perfil;
import com.velocinotech.erp02.domain.enums.TipoCliente;
import com.velocinotech.erp02.dto.EmpresaDTO;
import com.velocinotech.erp02.repositories.EmpresaRepository;
import com.velocinotech.erp02.repositories.PessoaRepository;
import com.velocinotech.erp02.repositories.UsuarioRepository;
import com.velocinotech.erp02.services.exceptions.ObjectNotFoundException;


@Service
public class EmpresaService {

	@Autowired
	private EmpresaRepository repo;

	@Autowired
	private PessoaRepository pessoarepository;
	
	@Autowired
	private BCryptPasswordEncoder pe;
	
	@Autowired
	private UsuarioRepository usuariorepository;

	public List<Empresa> findAll() {
		List<Empresa> obj = repo.findAll();		
		return obj;
	}
	
	public Empresa find(Integer id) {
		Empresa obj = repo.findOne(id);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + id + ", Tipo: " + Empresa.class.getName());
		}
		return obj;
	}

	public List<Empresa> FindNomeLike(String nome) {
		List<Empresa> obj = repo.FindNomeLike(nome);		
		return obj;
	}
	
	@Transactional
	public Empresa insert(Empresa obj) {
		
		//obj.setId(null);
		obj = repo.save(obj);

		for (Pessoa pess : obj.getPessoas()) {	
			pess.setEmpresa(obj);	
			
			for (Usuario usu : pess.getUsuarios()) {	
				usu.setPessoa(pess);				
			}
			usuariorepository.save(pess.getUsuarios());
		}
		pessoarepository.save(obj.getPessoas());
	    		
		return obj;
	}
	@Transactional
	public void insertARPZ() {
		
		Empresa emp = new Empresa(1, "Velocino Tech", "99", null
				, null, null, null, "ATIVA", null
				, null, null, "INFORMATICA", "JURIDICA");

		Empresa newemp = repo.save(emp);
		
		Funcionario func1 = new Funcionario(null, "FISICA", "023.037.038-16", "Denilson Peró de Lima", null, null,null
				,null,null, null,emp,null,null,"FUNCIONARIO",newemp.getId(),null
				,null, null, null, null
				,null, null, null,null,null,null
				,null,null,null,null,null,null);  

		Funcionario newfunc = pessoarepository.save(func1);
		
		Usuario usu = new Usuario(null, "Denilson Peró de Lima", "denilsonperodelima@gmail.com", "023.037.038-16" 
				,TipoCliente.PESSOAFISICA, pe.encode("cachorroloko"), newfunc, newemp.getId(), null, "ATIVO", newemp.getNome()	);	

		usu.addPerfil(Perfil.SUPER);
		
		usuariorepository.save(usu);

	}	
	@Transactional	
	public Empresa update(Empresa obj) {
		
		find(obj.getId());
		obj = repo.save(obj);
		
		return obj;		
	    
	}
	
	public Empresa fromDTO(EmpresaDTO objDto) {
		
		Empresa emp = new Empresa(null, objDto.getNome(), objDto.getDocumento(), objDto.getEndereco()
				, objDto.getCep(), objDto.getCidade(), objDto.getUf(), objDto.getStatus(), objDto.getContato1()
				, objDto.getContato2(), objDto.getContato3(), objDto.getSegmento(), objDto.getPessoa());
		
		for (Usuario usuDTO : objDto.getUsuarios()) {
			
		//	Usuario usu = new Usuario(usuDTO.getId(), usuDTO.getNome(), usuDTO.getEmail(), usuDTO.getCpfOuCnpj() 
		//			,usuDTO.getTipo(), usuDTO.getSenha(), usuDTO.getEmpresa(), usuDTO.getIdempresa(), null, null
		//			);	
			
			usuDTO.addPerfil(Perfil.SUPER);

			//emp.getUsuarios().add(usu);
			
		}

		return emp;
	}

	public Empresa fromDTOARPZ(Empresa objDto) {
		
		Empresa emp = new Empresa(1, "Velocino Tech", "99", objDto.getEndereco()
				, objDto.getCep(), objDto.getCidade(), objDto.getUf(), "ATIVA", objDto.getContato1()
				, objDto.getContato2(), objDto.getContato3(), "INFORMATICA", "JURIDICA");

		Funcionario func1 = new Funcionario(1, "FISICA", "023.037.038-16", "Denilson Peró de Lima", null, null,null
				,null,null, null,emp,null,null,"FUNCIONARIO",emp.getId(),null
				,null, null, null, null
				,null, null, null,null,null,null
				,null,null,null,null,null,null);  

		
		Usuario usu = new Usuario(1, "Denilson Peró de Lima", "denilsonperodelima@gmail.com", "023.037.038-16" 
				,TipoCliente.PESSOAFISICA, pe.encode("cachorroloko"), func1, emp.getId(), null, "ATIVO", emp.getNome()	);	

		   usu.addPerfil(Perfil.SUPER);
			
	       //emp.getPessoas().addAll(usu);
		
		return emp;
	}
	
	/*
	public Empresa fromDTOUpdate(EmpresaDTO objDto) {
		
		Empresa emp = new Empresa(null, objDto.getNome(), objDto.getDocumento(), objDto.getEndereco()
				, objDto.getCep(), objDto.getCidade(), objDto.getUf(), objDto.getStatus(), objDto.getContato1()
				, objDto.getContato2(), objDto.getContato3(), objDto.getSegmento(), objDto.getPessoa());
		
		for (Usuario usuDTO : objDto.getUsuarios()) {
			
			
			Usuario usu = new Usuario(usuDTO.getId(), usuDTO.getNome(), usuDTO.getEmail(), usuDTO.getCpfOuCnpj() 
					,usuDTO.getTipo(), usuDTO.getSenha(), usuDTO.getEmpresa(), usuDTO.getIdempresa(), null, null
					);	
			
			usuDTO.addPerfil(Perfil.SUPER);
			
			usu.setEmpresa(emp);
			
			emp.getUsuarios().add(usu);
			
			
		}
        
		return emp;
	}

		

		*/
	/*	
	public List<Empresa> findAll() {
		return repo.findAll();
	}

	
	private void updateData(Empresa newObj, Empresa obj) {
		newObj.setNome(obj.getNome());
	}
	*/





}