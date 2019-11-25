package com.velocinotech.erp02.resources.utils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Component;

@Component
public class ExecutaJPQL {
	
	@PersistenceContext
	private EntityManager em;
	
 	public void deletePerfil(Integer usuarioid) {
 	    
		   String hql = "delete from Perfil r where r.USUARIO_ID = :usuarioid";
		   em.createQuery(hql)
		   .setParameter("usuarioid", usuarioid);

		    em.close();
		}	
}
