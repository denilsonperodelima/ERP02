package com.velocinotech.erp02.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Usuario;
import com.velocinotech.erp02.domain.enums.Perfil;
import com.velocinotech.erp02.dto.UsuarioAlteracaoSenhaDTO;
import com.velocinotech.erp02.repositories.UsuarioRepository;
import com.velocinotech.erp02.services.exceptions.ObjectNotFoundException;
import com.velocinotech.erp02.services.validation.UsuarioAuthenticationExtra;


@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository repo;

	//@Autowired
	//private EmailService emailService;
	
	@Autowired
	private UsuarioAuthenticationExtra usuextraautentication;
	
	public Usuario find(Integer id) {
		
		/*
		UserSS user = UserService.authenticated();
		if (user==null || !user.hasRole(Perfil.ADMIN) && !id.equals(user.getId())) {
			throw new AuthorizationException("Acesso negado - userss");
		}
		*/
		
		Usuario obj = repo.findOne(id);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + id + ", Tipo: " + Usuario.class.getName());
		}
		return obj;
	}

	@Transactional
	public Usuario update(Usuario obj) {		
		obj.setId(null);
        repo.save(obj);
		return obj;
	}
	
	public Usuario updatesenha(Usuario obj) {
		repo.updateSenha(obj.getId(),  obj.getSenha());
		return null;
	}
	
	
	public void delete(Integer id) {
		repo.delete(id);
	}

	public Usuario findByEmail(String email) {
		Usuario obj = repo.findByEmail(email);
		return obj;
	}
		
	public List<Usuario> findAll() {
		return repo.findAll();
	}
	
	public Usuario fromDTO(UsuarioAlteracaoSenhaDTO objDto) {
		return new Usuario(objDto.getId(), null, objDto.getEmail(), null, null, objDto.getSenha(), null, null, 
				null, null, null);
	}
		
	public Page<Usuario> findPage(Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = new PageRequest(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return repo.findAll(pageRequest);
	}

	public String findperfis() {
		
		List<Perfil> listperfil = Arrays.asList(Perfil.values());
		//listperfil.remove(Perfil.valueOf("SUPER"));
		
		char quotes ='"';		
		String item = "[";
		for (Perfil x : listperfil) {
			if(Perfil.toEnum(x.getCod()) != Perfil.SUPER) {
				item += ",[" + x.getCod() + ","   + quotes +  Perfil.toEnum(x.getCod()) + quotes   + "]";					
			}
		
		}
		 item += "]";
		 item = item.replace("[,", "[");
		return item;
	}

	public String enviaArpz(String email) {

		Usuario obj = repo.findByEmail(email.replace("-",".")); // não está recebendo o ponto, deve ser mandado o traço
		if (obj == null) {
			throw new ObjectNotFoundException(
					"e-mail não cadastrado!  " +  email);
		}
        //emailService.sendNewPasswordEmail(obj, obj.getSenha());
        
		return "Email enviado!!";
	}
	
	public String validaperiodo(String email, Integer idempresa, Integer idpessoa) {
		return usuextraautentication.usuarioTemAcesso(email,idempresa, idpessoa);
	}
	
	

	public List<Usuario> FindNomeLike(String nome, Integer idempresa) {
		List<Usuario> usu = repo.FindNomeLike(idempresa, nome);
		return usu;
	}

	/*
	public Usuario fromDTO(UsuarioInclusaoDTO objDto) {
		
		String novasenha = senhainicial.getSenhaInicial();

		Usuario usu = new Usuario(null, objDto.getNome(), objDto.getEmail(), objDto.getCpfOuCnpj()
				, TipoCliente.toEnum(objDto.getTipo()), pe.encode(novasenha),objDto.get(), 0, objDto.getDataexpira(),objDto.getStatus());
        
		          emailService.sendNewPasswordEmail(usu, novasenha);
		
		return usu;
	}
	
	public Usuario fromDTOAdmin(UsuarioInclusaoDTO objDto) {
		
		String novasenha = senhainicial.getSenhaInicial();

		Usuario usu = new Usuario(null, objDto.getNome(), objDto.getEmail(), objDto.getCpfOuCnpj()
				, TipoCliente.toEnum(objDto.getTipo()), pe.encode(novasenha),objDto.getEmpresa(), 0, objDto.getDataexpira(),objDto.getStatus());
                  
		          usu.addPerfil(Perfil.ADMIN);
		          
		          emailService.sendNewPasswordEmail(usu, novasenha);
		
		return usu;
	}
	/*

	
	@Transactional
	public Usuario insert(Usuario obj) {
		//obj.setId(null);
		obj = repo.save(obj);
		return obj;
	}
	

	




	
	/*
	public Usuario findByEmail(String email) {
		UserSS user = UserService.authenticated();
		if (user == null || !user.hasRole(Perfil.ADMIN) && !email.equals(user.getUsername())) {
			throw new AuthorizationException("Acesso negado");
		}
	
		Usuario obj = repo.findByEmail(email);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + user.getId() + ", Tipo: " + Usuario.class.getName());
		}
		return obj;
	}	


	

	

	
	public URI uploadProfilePicture(MultipartFile multipartFile) {
		UserSS user = UserService.authenticated();
		if (user == null) {
			throw new AuthorizationException("Acesso negado");
		}
		
		BufferedImage jpgImage = imageService.getJpgImageFromFile(multipartFile);
		jpgImage = imageService.cropSquare(jpgImage);
		jpgImage = imageService.resize(jpgImage, size);
		
		String fileName = prefix + user.getId() + ".jpg";
		
		return s3Service.uploadFile(imageService.getInputStream(jpgImage, "jpg"), fileName, "image");
	}
	
		*/




}