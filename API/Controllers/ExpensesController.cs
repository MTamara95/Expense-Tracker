using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class ExpensesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private IExpenseRepository _expenseRepo;
        private IUserRepository _userRepo;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ExpensesController(IExpenseRepository expenseRepo, IMapper mapper,
            IUserRepository userRepo, IHttpContextAccessor httpContextAccessor)
        {
            _expenseRepo = expenseRepo;
            _userRepo = userRepo;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseDisplayDto>>> GetExpenses()
        {
            var userId = await GetUserId();

            var expenses = await _expenseRepo.GetAllExpenses(userId);
            var expensesForDisplay = _mapper
                .Map<IEnumerable<ExpenseDisplayDto>>(expenses);
            return Ok(expensesForDisplay);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseDisplayDto>> GetExpense(int id)
        {
            var userId = await GetUserId();

            var result = await _expenseRepo.GetExpense(id, userId);
            if (result == null)
            {
                return NotFound();
            }

            var mappedResult = _mapper.Map<ExpenseDisplayDto>(result);
            return mappedResult;
        }

        [HttpPost]
        public async Task<ActionResult<ExpenseDisplayDto>> CreateExpense(ExpenseForPutPostDto expense)
        {
            if (expense == null)
            {
                return BadRequest();
            }

            var userId = await GetUserId();
            expense.AppUserId = userId; // not happy with appUserId in the putpost model
            var createdExpense = await _expenseRepo.AddExpense(expense);
            var mappedExpense = _mapper.Map<ExpenseDisplayDto>(createdExpense);
            return CreatedAtAction(nameof(GetExpense), new { id = mappedExpense.Id }, mappedExpense);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ExpenseDisplayDto>> UpdateExpense(int id, 
            ExpenseForPutPostDto expense)
        {
            var userId = await GetUserId();
            var expenseToUpdate = await _expenseRepo.GetExpense(id, userId);
            if (expenseToUpdate == null)
            {
                return NotFound($"Expense with Id = {id} not found");
            }

            var result = await _expenseRepo.UpdateExpense(id, expense, userId);
            return _mapper.Map<ExpenseDisplayDto>(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ExpenseDisplayDto>> DeleteExpense(int id)
        {
            var userId = await GetUserId();
            var expenseToDelete = await _expenseRepo.GetExpense(id, userId);
            if (expenseToDelete == null)
            {
                return NotFound($"Expense with Id = {id} not found");
            }

            var result = await _expenseRepo.DeleteExpense(id, userId);
            return _mapper.Map<ExpenseDisplayDto>(result);
        }


        private async Task<int> GetUserId()
        {
            // later investigate is there a better way to do this
            var username = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userRepo.GetUserByUsername(username);
            return user.Id;
        }
    }
}
