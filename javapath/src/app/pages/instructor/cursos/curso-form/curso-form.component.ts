import { Component } from '@angular/core';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.css'
})
export class CursoFormComponent implements OnInit {
  cursoForm: FormGroup;
  isEditMode = false;
  selectedFileName = '';
  private cursoId?: number;

  constructor(
    private fb: FormBuilder,
    private instructorService: InstructorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cursoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      level: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.cursoId = +params['id'];
        this.loadCurso();
      }
    });
  }

  private loadCurso() {
    if (this.cursoId) {
      this.instructorService.getCursoById(this.cursoId).subscribe({
        next: (curso) => {
          this.cursoForm.patchValue(curso);
        },
        error: (error) => {
          console.error('Erro ao carregar curso:', error);
        }
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      if (this.cursoId) {
        this.instructorService.uploadMaterial(this.cursoId, file).subscribe({
          next: (response) => {
            this.cursoForm.patchValue({ imageUrl: response.url });
          },
          error: (error) => {
            console.error('Erro no upload:', error);
          }
        });
      }
    }
  }

  onSubmit() {
    if (this.cursoForm.valid) {
      const cursoData = this.cursoForm.value;
      
      if (this.isEditMode && this.cursoId) {
        this.instructorService.updateCurso(this.cursoId, cursoData).subscribe({
          next: () => this.router.navigate(['/instructor/cursos']),
          error: (error) => console.error('Erro ao atualizar curso:', error)
        });
      } else {
        this.instructorService.createCurso(cursoData).subscribe({
          next: () => this.router.navigate(['/instructor/cursos']),
          error: (error) => console.error('Erro ao criar curso:', error)
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/instructor/cursos']);
  }
}
