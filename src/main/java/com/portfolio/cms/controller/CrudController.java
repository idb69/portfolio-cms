package com.portfolio.cms.controller;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

public abstract class CrudController<T> {
    protected final JpaRepository<T, Long> repository;

    protected CrudController(JpaRepository<T, Long> repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<T> all() { return repository.findAll(); }

    @GetMapping("/{id}")
    public T get(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Record not found: " + id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public T create(@RequestBody T entity) { return repository.save(entity); }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public T update(@PathVariable Long id, @RequestBody T entity) {
        if (!repository.existsById(id)) throw new RuntimeException("Record not found: " + id);
        try {
            var field = entity.getClass().getSuperclass().getDeclaredField("id");
            field.setAccessible(true);
            field.set(entity, id);
        } catch (NoSuchFieldException e) {
            try {
                var field = entity.getClass().getDeclaredField("id");
                field.setAccessible(true);
                field.set(entity, id);
            } catch (Exception ex) {
                throw new RuntimeException("Unable to set entity ID", ex);
            }
        } catch (Exception e) {
            throw new RuntimeException("Unable to set entity ID", e);
        }
        return repository.save(entity);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        if (!repository.existsById(id)) throw new RuntimeException("Record not found: " + id);
        repository.deleteById(id);
    }
}
