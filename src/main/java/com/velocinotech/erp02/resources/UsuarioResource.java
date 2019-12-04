package com.velocinotech.erp02.resources;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.velocinotech.erp02.domain.Usuario;
import com.velocinotech.erp02.dto.UsuarioDTO;
import com.velocinotech.erp02.services.UsuarioService;

@RestController
@RequestMapping(value="/usuario")
public class UsuarioResource {

	@Autowired
	private UsuarioService service;		
	
	@Autowired
	private BCryptPasswordEncoder pe;
	
	//@PreAuthorize("hasRole('ADMIN') or hasRole('SUPER')")
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {
		Usuario obj = service.find(id);
		return ResponseEntity.ok().body(obj);
	}
	@PreAuthorize("hasRole('ADMIN') or hasRole('SUPER')")	
	@RequestMapping(value="/email/{email}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable String email) {
		Usuario obj = service.findByEmail(email.replace("-","."));
		return ResponseEntity.ok().body(obj);
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('SUPER')")	
	@RequestMapping(value="/perfis",method=RequestMethod.GET)
	public ResponseEntity<?> findperfis() {
		String listperfil = service.findperfis();
		return ResponseEntity.ok().body(listperfil);
	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('SUPER')")	
	@RequestMapping(value="/nome/{idempresa}/{nome}",method=RequestMethod.GET)
	public ResponseEntity<?> findbyname(@PathVariable Integer idempresa,@PathVariable String nome) {
		 List<Usuario> obj = service.FindNomeLike(nome, idempresa);
		return ResponseEntity.ok().body(obj);
	}
	  
	//validar periodo de suspensão, dias que pode trabalhar, etc
	//validar empresa suspensa, por isso o id da empresa tb.
	@PreAuthorize("hasRole('USUARIOSIS') or hasRole('ADMIN') or hasRole('SUPER')")	
	@RequestMapping(value="/periodo/{idempresa}/{idpessoa}/{email}",method=RequestMethod.GET)
	public ResponseEntity<?> periodo(@PathVariable String email, @PathVariable Integer idempresa, @PathVariable Integer idpessoa) {
		String retorno = service.validaperiodo(email.replace("-","."), idempresa, idpessoa);
		return ResponseEntity.ok().body(retorno);
	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('SUPER')")
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Usuario> update(@RequestBody Usuario obj) {
		
		Usuario usu = service.find(obj.getId());
		
		obj.setEmail(usu.getEmail());
		obj.setSenha(usu.getSenha());
		obj.setPessoa(usu.getPessoa());
	//	obj.setEmpresa(usu.getEmpresa());
		
		service.delete(obj.getId());
		
		obj = service.update(obj);
		return ResponseEntity.ok().body(obj);
	}
	@PreAuthorize("hasRole('USUARIOSIS') or hasRole('SUPER') or hasRole('ADMIN')")
	@RequestMapping(value="/alteraarpz/{email}",method=RequestMethod.POST)
	public ResponseEntity<Void> updatesSenha(@RequestBody String novoarpz, @PathVariable String email) {
		Usuario obj = service.findByEmail(email.replace("-","."));
		obj.setSenha(pe.encode(novoarpz));
		service.updatesenha(obj);
		return ResponseEntity.noContent().build();	
	}
	//@PreAuthorize("hasRole('USUARIOSIS') or hasRole('SUPER') or hasRole('ADMIN')")
	@RequestMapping(value="/enviararpz/{email}",method=RequestMethod.POST)
	public ResponseEntity<Void> enviaremail(@PathVariable String email) {		
		service.enviaArpz(email);	
		return ResponseEntity.noContent().build();	 
	}
	/*
	@PreAuthorize("hasRole('CLIENTE') or hasRole('SUPER') or hasRole('ADMIN')")   
	@RequestMapping(value="/enviaarpz/{email}",method=RequestMethod.PUT)
	public ResponseEntity<String> enviaArpz(@PathVariable String email) {
		String resp = service.enviaArpz(email.replace("-","."));	
		return ResponseEntity.ok().body(resp);
	}
	*/
	@PreAuthorize("hasRole('ADMIN') or hasRole('SUPER')")
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('SUPER')")
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<UsuarioDTO>> findAll() {
		List<Usuario> list = service.findAll();
		List<UsuarioDTO> listDto = list.stream().map(obj -> new UsuarioDTO(obj)).collect(Collectors.toList());  
		return ResponseEntity.ok().body(listDto);
	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('SUPER')")
	@RequestMapping(value="/page", method=RequestMethod.GET)
	public ResponseEntity<Page<UsuarioDTO>> findPage(
			@RequestParam(value="page", defaultValue="0") Integer page, 
			@RequestParam(value="linesPerPage", defaultValue="24") Integer linesPerPage, 
			@RequestParam(value="orderBy", defaultValue="nome") String orderBy, 
			@RequestParam(value="direction", defaultValue="ASC") String direction) {
		Page<Usuario> list = service.findPage(page, linesPerPage, orderBy, direction);
		Page<UsuarioDTO> listDto = list.map(obj -> new UsuarioDTO(obj));  
		return ResponseEntity.ok().body(listDto);
	}	
	
	/*
	
	@RequestMapping(value="/picture", method=RequestMethod.POST)
	public ResponseEntity<Void> uploadProfilePicture(@RequestParam(name="file") MultipartFile file) {
		URI uri = service.uploadProfilePicture(file);
		return ResponseEntity.created(uri).build();
	}
	*/
}
